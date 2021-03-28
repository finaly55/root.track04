var express = require('express');
var https = require('https');
var fs = require('fs');
var serveStatic = require('serve-static');
var cors = require('cors')

// https certificates
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/taskforce4.rj-it.fr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/taskforce4.rj-it.fr/fullchain.pem')
};

// create a service (the app object is just a callback).
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

// create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(port, () => {
    console.log("L'APP écoute sur le port " + port);
});



// create API for execute script
const api = express()

// middleware
api.use(cors());
api.options('*', cors());

// routes
api.get('/new-vm/:id', (req, res) => {
    console.log(req.params.id)
    shell.exec('./scripts/' + req.params.id + '/NewVM.sh')
    res.json({ "text": "VM created" })
})

api.get('/del-vm/:id', (req, res) => {
    shell.exec('./scripts/' + req.params.id + '/DelVM.sh')
    res.json({ "text": "VM deleted" })
})

// run API server
var portAPI = process.env.PORTAPI || 5001;

api.listen(portAPI, () => {
    console.log("L'API écoute sur le port " + portAPI)
})

