const fs = require('fs');
const http = require('http');

const express = require('express');
const socketio = require('socket.io');

const log = require('./log');


let app = express();
let server = http.Server(app);
let io = socketio(server, { path: '/_reload/server' });


function start(dir) {
    app.get(/^[^.]+$/, (req, res) => serveIndex(dir, req, res));
    app.use('/', express.static(dir));
    app.get('/_reload/client/reload.js', (req, res) => res.sendFile(__dirname + '/reload.js'));
    io.on('connection', socket => log.debug('Connected to reload client'));
    server.listen(8080, () => log.notice(`Listening on localhost:8080`));
}

function serveIndex(dir, req, res) {
    fs.readFile(dir + '/index.html', (err, body) => {
        if (err) throw err;
        body += '\n<script src="/_reload/server/socket.io.js"></script>\n';
        body += '<script src="/_reload/client/reload.js"></script>';
        res.set('Content-Type', 'text/html');
        res.send(body);
    });
}


exports.start = start;
exports.io = io;
