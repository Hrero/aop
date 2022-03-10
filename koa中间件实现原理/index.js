const http = require('http');
const Middleware = require('./middleware')

let middleware = new Middleware()

middleware.use(async function(ctx, next){
    console.log('step 001');
    ctx.info = 'go through middleware1';
    await next();
    console.log('step 006');
})

middleware.use(async function(ctx, next){
    console.log('step 002');
    await next();
    console.log('step 005');
});
  
middleware.use(async function(ctx, next){
    console.log('step 003');
    await next();
    console.log('step 004');
});
console.log(11)

middleware.start = middleware.compose();

http.createServer(function(req, res){
    let info = {};
    console.log(req.url);
    middleware.start(info);
    res.end(JSON.stringify(info));
}).listen(9527);

