#!/usr/bin/env sh

#Build
set -e
yarn build
cd dist

#Git
git init
git add -A
git commit -m 'deploy'

#Push to gh-pages branch
git push -f https://github.com/Eposkk/IDATT2105-Fullstack.git master:gh-pages

cd -
