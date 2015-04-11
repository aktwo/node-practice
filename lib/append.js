var fs = require("fs");

var txt = function(filePath, fileInfo) {
  var appendData = "\n";
  for (var attribute in fileInfo) {
    appendData += (attribute + ": " + fileInfo[attribute] + "\n");
  }
  fs.appendFile(filePath, appendData, function(err) {
    if (err) throw err;
  })
}

var json = function(filePath, fileInfo) {
  var oldFile = {}
  fs.readFile(filePath, function(err, data) {
    if (err) throw err;
    oldFile = JSON.parse(data);
    for (var attribute in fileInfo) {
      // TODO: Handle case when properties are being overwritten
      oldFile[attribute] = fileInfo[attribute];
    }

    fs.writeFile(filePath, JSON.stringify(oldFile), function(err) {
      if (err) throw err;
    });

  });
}

exports.txt = txt;
exports.json = json;
