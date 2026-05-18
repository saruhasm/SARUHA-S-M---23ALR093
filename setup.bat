@echo off
REM Campus Notification System - Setup Script for Windows
REM This script automatically installs and starts the application

cls
echo ===============================================
echo  Campus Notification System Setup
echo ===============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js is installed
echo.

REM Backend Setup
echo ===============================================
echo  Setting up Backend...
echo ===============================================
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo [✓] Backend dependencies installed
) else (
    echo [✓] Backend dependencies already installed
)

echo.
cd ..

REM Frontend Setup
echo ===============================================
echo  Setting up Frontend...
echo ===============================================
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo [✓] Frontend dependencies installed
) else (
    echo [✓] Frontend dependencies already installed
)

echo.
cd ..

REM Setup Complete
echo ===============================================
echo  Setup Complete!
echo ===============================================
echo.
echo Next steps:
echo.
echo 1. Open Terminal 1 and run:
echo    cd backend
echo    npm start
echo.
echo 2. Open Terminal 2 and run:
echo    cd frontend
echo    npm start
echo.
echo 3. Access the application at:
echo    http://localhost:3000
echo.
echo For more information, see QUICK_START.md or README.md
echo.
pause
