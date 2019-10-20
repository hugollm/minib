const http = require('http');
const express = require('express');
const log = require('./log');


function start(dir) {
    let app = express();
    let server = http.Server(app);
    app.use('/', express.static(dir));
    app.get(/^[^.]+$/, (req, res) => res.sendFile('index.html', { root: dir }));
    server.listen(8080, () => log.notice(`Listening on localhost:8080`));
}


exports.start = start;
