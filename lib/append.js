// To add new appending behavior for structured data files
// (such as XML, HTML, etc.), simply add a new method here
// and update the "appender" object in index.js

var fs = require("fs-extra");
var path = require("path");

// Helper method to append file metadata to txt files
var txt = function(fileInfo) {
  var appendData = "\n---\n";
  var filePath = fileInfo["new filepath"];
  for (var attribute in fileInfo) {
    appendData += (attribute + ": " + fileInfo[attribute] + "\n");
  }
  fs.appendFile(filePath, appendData, function(err) {
    if (err) throw err;
  });
}

// Helper method to append file metadata to json files
var json = function(fileInfo) {
  var filePath = fileInfo["new filepath"];
  fs.readJson(filePath, function(err, data) {
    for (var attribute in fileInfo) {
      data[attribute] = fileInfo[attribute];
    }
    fs.writeJson(filePath, data, function(err) {
      if (err) throw err;
    });
  });
}

exports.txt = txt;
exports.json = json;
