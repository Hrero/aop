const { logger } = require('@didi/nodex-logger')

logger.info('some msg')
logger.info([1, 2, 3])
logger.info(['name1', 'name2', { name3: 1}])
logger.info('name is %s, age is %d, obj is %j', 'nodex', 100, { hello: 1})
logger.info({a: 1, b: 2, c: [3,4], d: { e: 5 }})
logger.info(new Error('my name is error'))

// console.log(process.env.NODE_ENV, 'process.env.NODE_ENVprocess.env.NODE_ENV');
// const { log, msg } = require("@kd/dsl").Log;
// log(
//     msg(
//       "info",
//       "fenghuoTimeSever",
//       100010,
//       'LOGGERCODE'
//     )
//   );
