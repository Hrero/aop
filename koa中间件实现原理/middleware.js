module.exports = class MiddleWare {
    constructor() {
        this.queue = []
    }

    use(fn) {
        this.queue.push(fn)
    }

    compose() {
        return function(ctx, next) {
						let _this = this
						let index = -1
						return dispatch(0)

						function dispatch(i) {
							index = i
							let fn = i === _this.queue.length ? next : _this.queue[i]
							if (!fn) {
								return Promise.resolve()
							}
							try {
								/*
                 *中间件函数的形式为 async fn(ctx, next),可以看到此处透传了ctx的引用，
                 *同时next是一个延迟执行中间件队列中下一个中间件的函数，也就是说如果在前
                 *一个中间件的函数体中调用 await next()，就会启动下一个中间件,实际执行
                 *的函数是dispatch(i+1)。
                 */
								return Promise.resolve(fn(ctx, () => {
									return dispatch(i + 1)
								}))
							} catch (error) {
								return Promise.reject(error)
							}
						}
        }
    }
}