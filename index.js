var rename = require('./lib/rename');
var append = require('./lib/append');
var moment = require('moment');
var fs = require('fs-extra');
var path = require('path');

var appender = {};
appender['.txt'] = append.txt;
appender['.json'] = append.json;

var originDirectory = "./files/test/";
var destinationDirectory = "./files/moved/";

fs.readdir(originDirectory, function(err, files) {
  if (err) throw err;
  for (var i = 0; i < files.length; i++) {
    file = files[i];
    var currentMoment = moment();
    var fileExtension = path.extname(file);
    if (typeof appender[fileExtension] === "function") {
      rename.copy(path.resolve(originDirectory, file), destinationDirectory, currentMoment, function(fileInfo) {
        appender[fileExtension](fileInfo["new filepath"], fileInfo);
      });
    }
    else {
      console.log("Filetype " + fileExtension + " not supported.");
    }
  }
});
