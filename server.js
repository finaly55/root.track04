var express = require('express');
var https = require('https');
var fs = require('fs');
var serveStatic = require('serve-static');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/taskforce4.rj-it.fr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/taskforce4.rj-it.fr/fullchain.pem')
};

// Create a service (the app object is just a callback).
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(port);

console.log('server started '+ port);
