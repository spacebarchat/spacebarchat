echo Update files...
cd ../..
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	npm i
	cd ..
done
