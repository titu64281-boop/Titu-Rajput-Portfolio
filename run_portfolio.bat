@echo off
title Titu Kumar Portfolio Server
echo Starting Python Backend Server...

:: Backend folder me jakar server start karna
cd backend
start cmd /k "uvicorn app:app --reload"

:: Frontend website ko browser me kholna
timeout /t 2 >nul
start "" "..\frontend\index.html"

echo Server started on http://127.0.0.1:8000
exit