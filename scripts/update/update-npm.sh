echo Update all dependancies...
cd ../..
source "config.sh"
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	if [ $pnpm = true ]
  then
          pnpm i
  else
          npm i
  fi
	cd ..
done
