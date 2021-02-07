@ECHO off
ECHO.
ECHO Discord-Open-Source-Installer
ECHO 	v0.1 ~xnacly
ECHO.
ECHO str+c/str+d to exit
ECHO.
ECHO This will clone and setup all repositories,
ECHO if you only want to work on one specific repository
ECHO follow their specific Getting Started Guide and exit this script
ECHO.
CHOICE /C YN /m "Are you sure you want to continue (y/n)?"
IF %ERRORLEVEL% == 2 GOTO :end

where /q git
IF ERRORLEVEL 1 (
    ECHO Error: git is not installed.
	ECHO Please Install git from: https://git-scm.com/downloads
	ECHO And make sure its in the path
    GOTO :end
)

where /q node
IF ERRORLEVEL 1 (
	ECHO Error: node is not installed.
	ECHO Please Install NodeJS from: https://nodejs.org/en/download/
	ECHO And make sure its in the path
    GOTO :end
)

where /q npm
IF ERRORLEVEL 1 (
	ECHO 'Error: npm is not installed.' >&2
	ECHO Please install npm from: https://nodejs.org/en/download/
	ECHO And make sure its in the path
    GOTO :end
)
echo Dependencies are already Installed
ECHO.
echo Creating organization directory
ECHO.
CD ..\..\
MKDIR discord-open-source-workspace
cd discord-open-source-workspace
ECHO Cloning all repositories
ECHO.
git clone https://github.com/discord-open-source/discord-open-source overview
git clone https://github.com/discord-open-source/discord-api api
git clone https://github.com/discord-open-source/discord-gateway gateway
git clone https://github.com/discord-open-source/discord-voice voice
git clone https://github.com/discord-open-source/discord-server-util server-util
git clone https://github.com/discord-open-source/discord-cdn cdn
git clone https://github.com/discord-open-source/discord-css design
git clone https://github.com/discord-open-source/discord-client client
git clone https://github.com/discord-open-source/discord-react react
git clone https://github.com/discord-open-source/discord-react-native react-native
git clone https://github.com/discord-open-source/discord-dashboard dashboard

where /q code
IF ERRORLEVEL 0 (
	echo {"folders":[{"path":"overview"},{"path":"cdn"},{"path":"api"},{"path":"gateway"},{"path":"voice"},{"path":"server-util"},{"path":"design"},{"path":"react"},{"path":"client"},{"path":"react-native"},{"path":"dashboard"}]}> discord-open-source.code-workspace

	ECHO Opening VSCode Workspace
	code discord-open-source.code-workspace
)

:end
ECHO finished installation
@ECHO on
PAUSE
