fs = require("fs-extra");
path = require("path");

// Moves oldFileName from originDirectory to destinationDirectory,
// using an instance of moment() to timestamp the new file. Calls
// callback after move operation has completed.
var move = function(oldFileName, originDirectory, destinationDirectory, moment, callback) {
  // Generate old/new file/path strings
  var oldFilePath = path.join(originDirectory, oldFileName);
  var newFileName = appendDate(oldFileName, moment);
  var newFilePath = path.join(destinationDirectory, newFileName);

  var fileInfo = {
    "original filename": oldFileName,
    "original filepath": oldFilePath,
    "new filename": newFileName,
    "new filepath": newFilePath
  };

  // Move old file to new file and pass fileInfo to the callback
  fs.move(oldFilePath, newFilePath, function(err) {
    if (err) throw err;
    callback(fileInfo);
  })
}

// Helper function that uses fileName to generate a new filename
// string containing custom text and a formatted time stamp based on
// the current moment() object.
var appendDate = function(fileName, moment) {
  var fileExtension = path.extname(fileName);
  var fileBaseName = path.basename(fileName, fileExtension);
  return fileBaseName + "_EDITED_" +
    moment.format("YYYY-MM-DD_hh-mm") + fileExtension;
}

exports.move = move;
