const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
var httpProxy = require('http-proxy');
const {getHandler} = require('./cors/cors-anywhere');

const app = express();
const router = express.Router();

var proxy = httpProxy.createServer({
    xfwd: true,            // Append X-Forwarded-* headers
    secure: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0',
});

const requestHandler = getHandler({}, proxy);

app.use('/.netlify/functions/api', router);

router.use('/', requestHandler);

module.exports = app;
module.exports.handler = serverless(app);

