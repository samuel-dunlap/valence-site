#!/bin/bash

# Quick Deploy Script (skips tests - use only when tests already passed locally)
# For full deployment with tests, use ./deploy.sh instead

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "\n${BLUE}▶ $1${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check for changes
if [[ -z $(git status --porcelain) ]]; then
    print_warning "No changes to deploy."
    exit 0
fi

# Show changes
print_step "Changes to deploy:"
git status --short

# Get commit message
echo -e "\n${YELLOW}Commit message:${NC}"
read -r COMMIT_MSG

if [[ -z "$COMMIT_MSG" ]]; then
    COMMIT_MSG="Quick update"
fi

# Quick deploy
print_step "Quick deploying (skipping tests)..."
git add .
git commit -m "$COMMIT_MSG"
BRANCH=$(git branch --show-current)
git push origin "$BRANCH"

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}                    PUSHED TO GITHUB                              ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\nCloudflare Pages will run tests and build in CI."
echo -e "View: ${BLUE}https://valenceprivate.com${NC} (wait 2-3 min, hard refresh: Cmd+Shift+R)\n"
