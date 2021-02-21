mkdir dist
cp src/index.html dist/index.html
fjb src/index.jsx -o dist/dist.js
cp ./callgrind.svg dist/.
