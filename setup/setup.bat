@ECHO off
ECHO.
ECHO Fosscord-Installer
ECHO 	v0.2 
ECHO.
ECHO str+c/str+d to exit
ECHO.
ECHO This will clone and setup all repositories,
ECHO if you only want to work on one specific repository
ECHO follow their specific Getting Started Guide and exit this script
ECHO.
CHOICE /C YN /m "Are you sure you want to continue (y/n)?"
IF %ERRORLEVEL% == 2 GOTO :end1

where /q git
IF ERRORLEVEL 1 (
    ECHO Error: git is not installed.
	ECHO Please Install git from: https://git-scm.com/downloads
	ECHO And make sure its in the path
    GOTO :endrpc
)

where /q node
IF ERRORLEVEL 1 (
	ECHO Error: node is not installed.
	ECHO Please Install NodeJS from: https://nodejs.org/en/download/
	ECHO And make sure its in the path
    GOTO :endrpc
)

where /q npm
IF ERRORLEVEL 1 (
	ECHO 'Error: npm is not installed.' >&2
	ECHO Please install npm from: https://nodejs.org/en/download/
	ECHO And make sure its in the path
    GOTO :endrpc
)
echo Dependencies are already Installed
ECHO.
echo Creating organization directory
ECHO.
CD ..\..\
MKDIR fosscord-workspace
cd fosscord-workspace
ECHO Cloning all repositories
ECHO.
git clone https://github.com/fosscord/fosscord overview
git clone https://github.com/fosscord/fosscord-api api
git clone https://github.com/fosscord/fosscord-gateway gateway
git clone https://github.com/fosscord/fosscord-voice voice
git clone https://github.com/fosscord/fosscord-server-util server-util
git clone https://github.com/fosscord/fosscord-cdn cdn
git clone https://github.com/fosscord/fosscord-css design
git clone https://github.com/fosscord/fosscord-client client
git clone https://github.com/fosscord/fosscord-dashboard dashboard

where /q code
IF ERRORLEVEL 0 (
CALL	echo {"folders":[{"path":"overview"},{"path":"cdn"},{"path":"api"},{"path":"gateway"},{"path":"voice"},{"path":"server-util"},{"path":"design"},{"path":"client"},"path":"dashboard"}]}> fosscord.code-workspace

CALL	ECHO Opening VSCode Workspace
CALL	code discord-open-source.code-workspace
)

:END1

CHOICE /c yn /m "Do you want to install the Discord Rich Presence?"
IF %ERRORLEVEL% == 2 GOTO :endrpc
cd ..
cd rpc


CALL npm install

CALL npm i pm2 -g
 CALL pm2 start --name rpc index.js

CALL pm2 save 
CALL pm2-startup install
:endrpc
:end
ECHO finished installation
@ECHO on
PAUSE
