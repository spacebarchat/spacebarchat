echo Update for Git...
cd ../../../
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	git pull
	cd ..
done
echo Done