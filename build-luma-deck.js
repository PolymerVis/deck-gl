'use strict';
const fs = require('fs');
const browserify = require('browserify')();
const UglifyJS = require("uglify-js");

var fout = fs.createWriteStream('./dist/luma-deck-bundle.js')
  .on('finish', uglify);

browserify.add('./dist/index.js');
browserify.bundle().pipe(fout);

function uglify(err, body) {
  if (err) return console.error(err, err.stack);
  console.log('luma.gl and deck.gl bundled as luma-deck-bundle.js');
  var codes = UglifyJS.minify("./dist/luma-deck-bundle.js").code;
  fs.writeFile('./dist/luma-deck-bundle.min.js', codes, handleError);
}

function handleError(err, body) {
  if (err) return console.error(err, err.stack);
  console.log('luma-deck-bundle.js minified as luma-deck-bundle.min.js');
}
