var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var temp = require('temp');
var fs   = require('fs');
var exec = require('child_process').exec;

// Static file options
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js', 'css'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};

// Middleware
app.use(express.static('static', options));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');

// Main page
app.get('/', function (req, res) {
  res.render('index');
});

// Actual reformatting
app.post('/pep8ify', function (req, res) {
  console.log(req.body.code)

  temp.open('pep8me', function(err, tmpFileInfo) {
    if (err) {
      console.log("Error opening temp file!", error);
    }

    console.log("OPENED", tmpFileInfo.path);

    fs.writeFile(tmpFileInfo.path, req.body.code, function (err) {
      if (err) {
        console.log("Error writing to temp file!", error);
      }

      console.log("WROTE", tmpFileInfo.path);

      exec("autopep8 " + tmpFileInfo.path, function(err, stdout) {    
        if (err) {
          console.log("Error executing autopep8!", error);
        }

        res.end(stdout);
      });
    });
  });
});

// Set up server
var server = app.listen((process.env.PORT || 3000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
