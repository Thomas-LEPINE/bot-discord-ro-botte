@echo off

:: Commandes git ↓
git pull
git add .
git status
SET /P commit-message = Message du commit :  
git commit -m %commit-message
@REM git commit -m %1
git push
:: #################

set /p enter = Appuyez sur une touche pour terminer ...