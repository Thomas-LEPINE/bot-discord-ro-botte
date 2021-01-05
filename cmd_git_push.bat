@echo off

:: Commandes git ↓
git pull
git add .
git status
set /p commit-message="Message du commit :  "
@REM set final=
@REM for %%a in (%commit-message%) do (
@REM     set final+= %%a
@REM )
@REM for %%b in (%final%) do (
@REM     echo %%b
@REM )
@REM @REM for %%a in (%commit-message%) do (
@REM @REM     echo %%a
@REM @REM )

git commit -m "%commit-message%"
git commit -m %1
git push
:: #################


set /p enter = Appuyez sur une touche pour terminer ...