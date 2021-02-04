echo --------------------------------------
echo Discord Open Source Contribution Setup
echo strg+c/strg+d to exit
echo -------------------------------------------
echo This will clone and setup all repositories,
echo if you only want to work on one specific repository
echo follow their specific Getting Started Guide and exit this script
echo ----------------------------------------------------------------
echo "Are you sure you want to continue (y/n)?"
read -p "" CONT
if [ "$CONT" != "y" ]; then
  echo Aborting setup
  exit 1
fi
echo ---------------------
echo Checking dependencies
if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed.' >&2
  echo Please Install git from: https://git-scm.com/downloads
  echo And make sure its in the path
  exit 1
fi
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: node is not installed.' >&2
  echo Please Install NodeJS from: https://nodejs.org/en/download/
  echo And make sure its in the path
  exit 1
fi
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  echo Please install npm from: https://nodejs.org/en/download/
  echo And make sure its in the path
  exit 1
fi
echo ✓ All Dependencies Installed
echo -------------------------------
echo Creating organization directory
cd ../../
mv discord-open-source overview
mkdir discord-open-source
mv overview discord-open-source/
cd discord-open-source
echo Cloning all repositories
git clone https://github.com/discord-open-source/discord-api api
git clone https://github.com/discord-open-source/discord-gateway gateway
git clone https://github.com/discord-open-source/discord-voice voice
git clone https://github.com/discord-open-source/discord-cdn cdn
git clone https://github.com/discord-open-source/discord-css design
git clone https://github.com/discord-open-source/discord-client client
git clone https://github.com/discord-open-source/discord-react react
git clone https://github.com/discord-open-source/discord-react-native react-native
git clone https://github.com/discord-open-source/discord-dashboard dashboard
if [ -x "$(command -v code)" ]; then
  echo '{"folders":[{"path":"overview"},{"path":"cdn"},{"path":"api"},{"path":"gateway"},{"path":"voice"},{"path":"design"},{"path":"react"},{"path":"client"},{"path":"react-native"},{"path":"dashboard"}]}' >> discord-open-source.code-workspace
  echo Open VSCode Workspace
  code discord-open-source.code-workspace
fi
