#!/bin/bash

# Valence Website Deployment Script
# This script runs all checks, builds, and deploys to Cloudflare Pages via Git push

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
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

# Check if there are changes to commit
print_step "Checking for changes..."
if [[ -z $(git status --porcelain) ]]; then
    print_warning "No changes to deploy. Working directory is clean."
    exit 0
fi

# Show what will be committed
print_step "Changes to be deployed:"
git status --short

# Ask for commit message
echo -e "\n${YELLOW}Enter commit message (or press Enter for auto-generated message):${NC}"
read -r COMMIT_MSG

if [[ -z "$COMMIT_MSG" ]]; then
    COMMIT_MSG="Update website content and code"
fi

# Run all checks before deploying
print_step "Running full test suite (this may take a few minutes)..."
if npm run test:all; then
    print_success "All tests passed!"
else
    print_error "Tests failed. Fix the errors before deploying."
    exit 1
fi

# Stage all changes
print_step "Staging changes..."
git add .
print_success "Changes staged"

# Commit
print_step "Creating commit..."
if git commit -m "$COMMIT_MSG"; then
    print_success "Commit created: $COMMIT_MSG"
else
    print_error "Commit failed"
    exit 1
fi

# Push to GitHub (triggers Cloudflare Pages deployment)
print_step "Pushing to GitHub (this triggers Cloudflare Pages deployment)..."
BRANCH=$(git branch --show-current)

if git push origin "$BRANCH"; then
    print_success "Pushed to GitHub ($BRANCH)"
else
    print_error "Push failed"
    exit 1
fi

# Success message
echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}                    DEPLOYMENT INITIATED                          ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\n${BLUE}What happens next:${NC}"
echo "  1. Cloudflare Pages detected your push"
echo "  2. Running npm ci and npm run build (~2-3 minutes)"
echo "  3. Deploying to valenceprivate.com"
echo ""
echo -e "${YELLOW}Monitor deployment:${NC}"
echo "  https://dash.cloudflare.com (go to Pages → valence-site)"
echo ""
echo -e "${YELLOW}Test your changes:${NC}"
echo "  https://valenceprivate.com (wait 2-3 min, then hard refresh: Cmd+Shift+R)"
echo ""
echo -e "${GREEN}Pro tip:${NC} Use 'npm run dev' for instant local preview during development!"
echo ""
