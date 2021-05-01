echo Update all dependancies...
cd ../..
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	if [ $pnpm = true ]
	if ! [ -x "$(command -v pnpm)" ]; then
	  npm i
	else
	  pnpm i
	fi
done
