#!/usr/bin/env bash
# exit on error
set -o errexit

# Install backend dependencies
pip install -r backend/requirements.txt

# Optional: Run database migrations if needed
# python backend/migrate.py
