echo Update for Git...
cd ../../../
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	pnpm i
	cd ..
done
echo Done