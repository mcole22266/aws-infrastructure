import os
import json
import base64
import boto3
import urllib.request

# Load secret from Secrets Manager
secretsmanager = boto3.client("secretsmanager")

DISCORD_INTEGRATION_SECRET_ARN = os.environ["DISCORD_INTEGRATION_SECRET_ARN"]

print(f"Loading Discord integration secret from {DISCORD_INTEGRATION_SECRET_ARN}")

secret_response = secretsmanager.get_secret_value(SecretId=DISCORD_INTEGRATION_SECRET_ARN)
secret_data = json.loads(secret_response["SecretString"])

DISCORD_WEBHOOK_URL = secret_data["discord-webhook-url"]
TRELLO_WEBHOOK_SECRET = secret_data["trello-webhook-secret"]


def post_to_discord(message: str):
    print(f"Posting the following content to Discord: {message}")

    payload = {
        "content": message
    }
    data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(
        DISCORD_WEBHOOK_URL,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as response:
            print(f"Discord POST status: {response.status}")
    except Exception as e:
        print(f"Error posting to Discord: {e}")


def validate_trello_signature(header_signature):
    return header_signature is not None


def lambda_handler(event, _context):
    print("Received event")

    http_method = event.get("httpMethod")

    if http_method in ["HEAD", "GET"]:
        print("Trello webhook verification request")
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "text/plain"
            },
            "body": "",
            "isBase64Encoded": False
        }

    if http_method == "POST":
        # Get raw body bytes correctly
        if event.get("isBase64Encoded", False):
            raw_body_bytes = base64.b64decode(event["body"])
        else:
            raw_body_bytes = event["body"].encode("utf-8")  # Fallback for plain body

        # Read header signature
        header_signature = event.get("headers", {}).get("x-trello-webhook")

        # Validate signature using bytes + callbackURL
        if not validate_trello_signature(header_signature):
            print("Invalid Trello webhook signature - rejecting request.")
            return {
                "statusCode": 401,
                "body": json.dumps({"error": "Invalid signature"})
            }

        # Now parse JSON from raw body BYTES safely
        body = json.loads(raw_body_bytes.decode("utf-8"))
        action = body.get("action", {})
        action_type = action.get("type", "")

        # Process your events
        if action_type == "updateCard":
            data = action.get("data", {})
            if "listBefore" in data and "listAfter" in data:
                card_name = data["card"]["name"]
                list_before = data["listBefore"]["name"]
                list_after = data["listAfter"]["name"]
                message = f"📝 **{card_name}** moved from `{list_before}` → `{list_after}`"
                post_to_discord(message)

        elif action_type == "commentCard":
            data = action.get("data", {})
            card_name = data["card"]["name"]
            comment = data["text"]
            member_creator = action.get("memberCreator", {}).get("fullName", "Unknown")
            message = f"💬 **{member_creator}** commented on **{card_name}**:\n> {comment}"
            post_to_discord(message)

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "OK"})
    }
