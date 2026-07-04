#!/bin/bash
# Hostinger SSH deploy — run on server after first-time setup
# Repo: https://github.com/shailendra900589/Salon-Factory.git

set -e
DEPLOY_DIR="${1:-$HOME/domains/salonfactory.in/public_html}"

cd "$DEPLOY_DIR"

if [ ! -d .git ]; then
  git clone https://github.com/shailendra900589/Salon-Factory.git .
else
  git fetch origin
  git reset --hard origin/main
fi

echo "Deployed to $DEPLOY_DIR"
