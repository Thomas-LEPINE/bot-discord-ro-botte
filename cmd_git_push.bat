@echo off

:: Commandes git ↓
git pull
git add .
git status
set /p commitMessage = Message du commit :  
git commit -m $commitMessage
git push
:: #################

echo  
set /p enter = Appuyez sur une touche pour terminer ...