echo Update files...
cd ..
for D in */; do
	echo --------------
	echo "$D";
	cd $D
	git sync
	cd ..
done
