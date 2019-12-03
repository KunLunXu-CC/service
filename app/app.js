const { printStartCharPattern } = require('../utils/charPattern');
const middleware = require('./middleware');
const config = require('../config/system');
const graphql = require('./graphql');
const router = require('./route');
const cron = require('./cron');
const Koa = require('koa');
const db = require('./db');
const app = new Koa();

db(app);
middleware(app);
router(app);
graphql(app);
cron(app);

app.listen(config.port, printStartCharPattern);
