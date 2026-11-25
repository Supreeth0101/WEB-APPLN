@echo off
cd /d "%~dp0"
echo [%date% %time%] starting > setup-log.txt
where node >> setup-log.txt 2>&1
node -v >> setup-log.txt 2>&1

echo Installing packages (first run can take a minute)...
call npm install --no-audit --no-fund >> setup-log.txt 2>&1
if errorlevel 1 (
  echo npm install FAILED - see setup-log.txt
  echo INSTALL_FAILED >> setup-log.txt
  pause
  exit /b 1
)

echo Creating database table...
call npm run db:init >> setup-log.txt 2>&1
if errorlevel 1 (
  echo db:init FAILED - see setup-log.txt
  echo DBINIT_FAILED >> setup-log.txt
  pause
  exit /b 1
)
echo SETUP_OK >> setup-log.txt

echo Starting app at http://localhost:3000  (close this window to stop it)
call npm run dev > dev-log.txt 2>&1
