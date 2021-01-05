@echo off

:: Commandes git ↓
git pull
git add .
git status
SET commitMessage =
SET /P commitMessage = Message du commit :  
git commit -m '' & %commitMessage%
git push
:: #################

echo %commitMessage%

echo
set /p enter = Appuyez sur une touche pour terminer ...