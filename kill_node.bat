@echo off
taskkill /F /IM node.exe
timeout /t 2
echo All node processes killed!
