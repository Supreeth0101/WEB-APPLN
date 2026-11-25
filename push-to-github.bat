@echo off
cd /d "%~dp0"
set LOG=push-log.txt
echo [%date% %time%] push starting > %LOG%
git --version >> %LOG% 2>&1 || (echo GIT_NOT_FOUND >> %LOG% & exit /b 1)

if not exist ".git" git init >> %LOG% 2>&1
git add -A >> %LOG% 2>&1
git commit -m "Web App: Next.js + TypeScript + PostgreSQL register, login and home pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_018HumDMmw9cB3A2U7DEYLyX" >> %LOG% 2>&1
git branch -M main >> %LOG% 2>&1

git remote remove origin >nul 2>&1
git remote add origin https://github.com/Supreeth0101/WEB-APPLN.git >> %LOG% 2>&1

echo --- pull (merges anything already in the repo) --- >> %LOG%
git pull origin main --allow-unrelated-histories --no-edit -X ours >> %LOG% 2>&1

echo --- push --- >> %LOG%
git push -u origin main >> %LOG% 2>&1
if errorlevel 1 (echo PUSH_FAILED >> %LOG%) else (echo PUSH_OK >> %LOG%)
echo --- tracked files --- >> %LOG%
git ls-files >> %LOG% 2>&1
