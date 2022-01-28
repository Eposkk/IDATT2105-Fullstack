#!/usr/bin/env sh

#Build
set -e
npm run build
cd dist

#Git
git init
git add -A
git commit -m 'deploy'

#Push to gh-pages branch
git push -f https://github.com/eposkk/calculator.git master:gh-pages

cd -
