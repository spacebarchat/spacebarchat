echo Update for Git...
cd ../../../
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	npm i
	cd ..
done
echo Done