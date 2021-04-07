@ECHO off
ECHO Update...
cd ..\..\..\
FOR /D %%a IN (%CD%\fosscord-workspace\*) do git -C %%~fa pull &&  npm i
PAUSE