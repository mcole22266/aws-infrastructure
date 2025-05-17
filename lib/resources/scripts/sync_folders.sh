#!/bin/bash
# Sync all folders to S3

# ==== CONFIG ====
PROFILE="michael"
BUCKET_NAME="backup-bucket-971528321227-us-east-2"

# Prepare log paths
TODAY=$(date +%F)
LOCAL_LOGFILE="$HOME/.sync-folders.log"
S3_LOGFILE="sync-logs/${TODAY}-sync-folders.log"

# ==== CLEAN UP OLD LOG ====
echo "Cleaning up old log file"
[ -f "$LOCAL_LOGFILE" ] && rm "$LOCAL_LOGFILE"
mkdir -p "$(dirname "$LOCAL_LOGFILE")"
touch "$LOCAL_LOGFILE"
echo "[$(date)] 🔄 Starting sync run..." | tee -a "$LOCAL_LOGFILE"

# ==== SYNC FUNCTION ====
sync_folder() {
  local LOCAL_PATH="$1"
  local S3_PREFIX="$2"

  echo "[$(date)] Syncing: $LOCAL_PATH → s3://$BUCKET_NAME/$S3_PREFIX/" | tee -a "$LOCAL_LOGFILE"
  aws s3 sync "$LOCAL_PATH" "s3://$BUCKET_NAME/$S3_PREFIX/" \
    --storage-class STANDARD_IA \
    --delete \
    --profile "$PROFILE" >> "$LOCAL_LOGFILE" 2>&1
  echo "[$(date)] ✅ Done: $S3_PREFIX" | tee -a "$LOCAL_LOGFILE"
}

# ==== SYNC TASKS ====

# Obsidian
sync_folder "/home/michael/Documents/Obsidian/Books" "Obsidian/Books"
sync_folder "/home/michael/Documents/Obsidian/General" "Obsidian/General"
sync_folder "/home/michael/Documents/Obsidian/TTRPGs" "Obsidian/TTRPGs"

# TTRPGs
sync_folder "/media/michael/Ubuntu Internal/TTRPGs" "TTRPGs"

# Games
sync_folder "/media/michael/Ubuntu Internal/Games" "Games"

# 3d Printing Files
sync_folder "/home/michael/Documents/3d Printing" "3d Printing"

echo "[$(date)] ✅ Full sync completed." | tee -a "$LOCAL_LOGFILE"

# ==== UPLOAD LOG FILE TO S3 ====
aws s3 cp "$LOCAL_LOGFILE" "s3://$BUCKET_NAME/$S3_LOGFILE" \
  --storage-class STANDARD_IA \
  --profile "$PROFILE" | tee -a "$LOCAL_LOGFILE" 2>&1

echo "[$(date)] 📤 Log file uploaded to s3://$BUCKET_NAME/$S3_LOGFILE" | tee -a "$LOCAL_LOGFILE"
