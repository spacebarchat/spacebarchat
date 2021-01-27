@ECHO off
ECHO.
ECHO Discord-Open-Source-Installer
ECHO 	v0.1 ~xnacly
ECHO.
ECHO str+c/str+d to exit
ECHO 1: /discord-dashboard.git
ECHO 2: /discord-server.git
ECHO 3: /discord-cdn.git
ECHO 4: /discord-client.git
ECHO 5: /discord-react-native.git
ECHO 6: /discord-react.git
ECHO 7: /discord-css.git
ECHO A: all of the above
ECHO.
CHOICE /c 1234567a /m "decide what repos to install"


IF ERRORLEVEL ==A GOTO ALL
IF ERRORLEVEL ==1
IF ERRORLEVEL ==2
IF ERRORLEVEL ==3
IF ERRORLEVEL ==4
IF ERRORLEVEL ==5
IF ERRORLEVEL ==6
IF ERRORLEVEL ==7

:ALL
cd ..
mkdir discord-open-source-repos
cd discord-open-source-repos
git clone https://github.com/discord-open-source/discord-dashboard.git
git clone https://github.com/discord-open-source/discord-server.git
git clone https://github.com/discord-open-source/discord-cdn.git
git clone https://github.com/discord-open-source/discord-client.git
git clone https://github.com/discord-open-source/discord-react-native.git
git clone https://github.com/discord-open-source/discord-react.git
git clone https://github.com/discord-open-source/discord-css.git
