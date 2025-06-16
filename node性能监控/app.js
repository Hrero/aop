// app.js
const Koa = require('koa');
const router = require('koa-route');

const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const welcome = (ctx, name) => {
  if (name == 'memory') {
    const memory = require('./memory')
    const osInfo = memory.memory()
    ctx.response.body = osInfo;
  }
};

app.use(router.get('/', main));
app.use(router.get('/:name', welcome));

app.listen(3000);
console.log('localhost:3000');
// node --inspect app.js
// chrome://inspect

