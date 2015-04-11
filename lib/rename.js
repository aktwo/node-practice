fs = require("fs-extra");
path = require("path");

var copy = function(oldFilePath, destinationDirectory, moment, callback) {
  var oldFileName = path.basename(oldFilePath);
  var newFileName = appendDate(oldFileName, moment);
  var newFilePath = path.resolve(destinationDirectory, newFileName);
  fs.createReadStream(oldFilePath).pipe(fs.createOutputStream(newFilePath, {flags: 'w'}));
  var fileInfo = {
    "original filename": oldFileName,
    "original filepath": oldFilePath,
    "new filename": newFileName,
    "new filepath": newFilePath
  };
  console.log(fileInfo)
  callback(fileInfo);
}

var appendDate = function(fileName, moment) {
  var fileExtension = path.extname(fileName);
  var fileBaseName = path.basename(fileName, fileExtension);
  return fileBaseName + "_EDITED_" +
    moment.format("YYYY-MM-DD_hh-mm") + fileExtension;
}

exports.copy = copy;
