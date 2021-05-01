@ECHO off
ECHO Update for Git...
cd ..\..
FOR /D %%a IN (%CD%\fosscord\*) do echo -------------- && echo %%~fa && git -C %%~fa pull
