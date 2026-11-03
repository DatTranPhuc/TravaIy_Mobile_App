@echo off
title TravAIy Android Emulator Launcher
echo ====================================================
echo   DANG KHOI DONG MAY AO TRAVAIY (CUA SO DOC LAP)...
echo ====================================================
del /f /q "C:\Users\datph\.android\avd\*\*.lock" 2>nul
start "" "%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_API_36.1 -no-snapshot-load
echo Dang doi may ao khoi dong...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" wait-for-device
:wait_boot
for /f "tokens=*" %%a in ('"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell getprop sys.boot_completed 2^>nul') do set BOOT=%%a
if not "%BOOT%"=="1" (
    timeout /t 2 /nobreak >nul
    goto wait_boot
)
echo Dang cai dat phien ban TravAIy moi nhat...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" install -r "D:\EXE_project\TravAIyMobile\android\app\build\outputs\apk\debug\app-debug.apk"
echo Dang mo ung dung TravAIy...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell monkey -p com.travaiy.app -c android.intent.category.LAUNCHER 1
echo ====================================================
echo   HOAN TAT! UNG DUNG DA MO TREN MAY AO!
echo ====================================================
pause
