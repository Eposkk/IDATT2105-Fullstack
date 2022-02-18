#!/usr/bin/env sh

#Remove previous build

rm -rf dist

#Build
set -e
yarn build

#Add CNAME file
cd dist
echo 'dudensomflytta.no' > CNAME

#Git
git init
git add -A
git commit -m 'deploy'



#Push to gh-pages branch
git push -f https://github.com/Eposkk/IDATT2105-Fullstack.git master:gh-pages


cd -
