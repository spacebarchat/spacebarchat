echo Update all repositories ...
cd ../../../
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	git pull
	npm i
	cd ..
done
echo Done