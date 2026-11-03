@echo off
title TravAIy Android Launcher (Hot Reload Auto-Update)
echo ====================================================
echo   KHOI DONG TRAVAIY + TU DONG CAP NHAT HOT RELOAD
echo ====================================================

:: 1. Khoi dong Metro Server o cua so rieng de ho tro Fast Refresh
echo [1/4] Dang mo Metro Bundler ho tro Hot Reload...
start "Metro Server (TravAIy Hot Reload)" cmd /k "cd /d D:\EXE_project\TravAIyMobile && npx react-native start"

:: 2. Don dep lock va khoi dong may ao
echo [2/4] Dang mo may ao Android (Cua so doc lap)...
del /f /q "C:\Users\datph\.android\avd\*\*.lock" 2>nul
start "" "%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_API_36.1 -no-snapshot-load

:: 3. Doi may ao boot xong
echo [3/4] Dang doi may ao san sang...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" wait-for-device
:wait_boot
for /f "tokens=*" %%a in ('"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell getprop sys.boot_completed 2^>nul') do set BOOT=%%a
if not "%BOOT%"=="1" (
    timeout /t 2 /nobreak >nul
    goto wait_boot
)

:: 4. Ket noi Hot Reload va cai dat app
echo [4/4] Ket noi Hot Reload (port 8081) va mo app...
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" reverse tcp:8081 tcp:8081
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" install -r "D:\EXE_project\TravAIyMobile\android\app\build\outputs\apk\debug\app-debug.apk"
"%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" shell monkey -p com.travaiy.app -c android.intent.category.LAUNCHER 1

echo ====================================================
echo   HOAN TAT!
echo   - App da mo tren may ao.
echo   - TU DONG CAP NHAT (Hot Reload): Khi ban sua code .tsx
echo     va nhan Ctrl+S, may ao se tu dong doi giao dien tuc thi!
echo ====================================================
pause
