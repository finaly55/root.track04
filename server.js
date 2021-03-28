var express = require('express');
var http = require('http');
var cors = require('cors')
var fs = require('fs');
var serveStatic = require('serve-static');
const shell = require('shelljs')


// This line is from the Node.js HTTPS documentation.
// Create a service (the app object is just a callback).
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;

// Create an HTTPS service identical to the HTTP service.
http.createServer(app).listen(port);

const api = express()

api.use(cors());
api.options('*', cors());

api.get('/new-vm/:id', (req, res) => {
    console.log(req.params.id)
    shell.exec('./scripts/' + req.params.id + '/NewVM.sh')
    res.json({"text": "VM created"})
})

api.get('/del-vm/:id', (req, res) => {
    shell.exec('./scripts/' + req.params.id + '/DelVM.sh')
    res.json({ "text": "VM deleted" })
})

api.listen(5001, () => {
    console.log("Serveur à l'écoute")
})

console.log('server started ' + port);
