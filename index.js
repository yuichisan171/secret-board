'use strict';
const http = require('http');
const auth = require('http-auth');
const router = require('./lib/router');

const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
})

const server = http
  .createServer(basic, (req, res) => {
    router.route(req, res); //routerモジュールのroute関数を呼べば、必要なリクエストの振り分け処理を行ってくれる
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });

const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});