@ECHO off
ECHO Update all dependencies...
cd ..
where /q pnpm
IF ERRORLEVEL 1 (
	FOR /D %%a IN (%CD%\fosscord\*) do echo -------------- && echo %%~fa && cd %%~fa && npm i
) ELSE (
  FOR /D %%a IN (%CD%\fosscord\*) do echo -------------- && echo %%~fa && cd %%~fa && pnpm i
)
@ECHO on
