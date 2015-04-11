var rename = require('./lib/rename');
var append = require('./lib/append');
var moment = require('moment');
var fs = require('fs-extra');
var path = require('path');

// Add more filetypes here with the corresponding methods in
// append.js if you'd like to support more file-types.
var appender = {};
appender['.txt'] = append.txt;
appender['.json'] = append.json;

// All files transferred by this program are in originDirectory
// and transferred to destinationDirectory. Note that any
// sub-directories of originDirectory are ignored.
var originDirectory = "./files/original/";
var destinationDirectory = "./files/moved/";

// Main program loop
fs.readdir(originDirectory, function(err, files) {
  if (err) throw err;
  for (var i = 0; i < files.length; i++) {
    file = files[i];
    var currentMoment = moment();
    var fileExtension = path.extname(file)
    if (typeof appender[fileExtension] === "function") {
      rename.move(file, originDirectory, destinationDirectory, currentMoment, function(fileInfo) {
        var fileExtensionInCallback = path.extname(fileInfo["original filename"]);
        appender[fileExtensionInCallback](fileInfo);
      });
    }
    else {
      if (fileExtension !== "") {
        console.log("Filetype " + fileExtension + " not supported.");
      }
    }
  }
});
