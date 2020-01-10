const { printStartCharPattern } = require('../utils/charPattern');
const middleware = require('./middleware');
const config = require('../config/system');
const graphql = require('./graphql');
const router = require('./route');
const https = require('https');
const cron = require('./cron');
const path = require('path');
const Koa = require('koa');
const db = require('./db');
const app = new Koa();

db(app);
middleware(app);
router(app);
graphql(app);
cron(app);

app.listen(config.port, printStartCharPattern);

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../docker/nginx/ssl.crt')),
};

https.createServer(options, app).listen(config.port, printStartCharPattern);
