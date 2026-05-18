#!/bin/bash

# Campus Notification System - Setup Script for Mac/Linux
# This script automatically installs and starts the application

echo "======================================="
echo " Campus Notification System Setup"
echo "======================================="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[✓] Node.js is installed"
echo

# Backend Setup
echo "======================================="
echo " Setting up Backend..."
echo "======================================="
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install backend dependencies"
        exit 1
    fi
    echo "[✓] Backend dependencies installed"
else
    echo "[✓] Backend dependencies already installed"
fi

echo
cd ..

# Frontend Setup
echo "======================================="
echo " Setting up Frontend..."
echo "======================================="
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install frontend dependencies"
        exit 1
    fi
    echo "[✓] Frontend dependencies installed"
else
    echo "[✓] Frontend dependencies already installed"
fi

echo
cd ..

# Setup Complete
echo "======================================="
echo " Setup Complete!"
echo "======================================="
echo
echo "Next steps:"
echo
echo "1. Open Terminal 1 and run:"
echo "   cd backend"
echo "   npm start"
echo
echo "2. Open Terminal 2 and run:"
echo "   cd frontend"
echo "   npm start"
echo
echo "3. Access the application at:"
echo "   http://localhost:3000"
echo
echo "For more information, see QUICK_START.md or README.md"
echo
