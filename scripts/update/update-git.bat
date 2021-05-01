@ECHO off
ECHO Update for Git...
cd ..\..
FOR /D %%a IN (%CD%\*) do echo -------------- && echo %%~fa && cd %%~fa && git pull
cd ..\..
@ECHO on
