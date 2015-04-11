var rename = require('./lib/rename');
var append = require('./lib/append');
var moment = require('moment');
var fs = require('fs');
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
    var fileInfo = rename.copy(path.join(originDirectory, file), destinationDirectory, currentMoment);
    if (typeof appender[fileExtension] === "function") {
      appender[fileExtension](fileInfo["new filepath"], fileInfo);
    }
    else {
      console.log("Filetype " + fileExtension + " not supported.");
    }
  }
});
