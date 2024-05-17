// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const YOUR_HOST = '192.168.1.139'; // Replace 'YOUR_HOST_HERE' with your desired host

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, YOUR_HOST, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${YOUR_HOST}:3000`);
  });
});
