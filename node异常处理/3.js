class MiddleWareTimer {
    queue = [];
    constructor() {}
    use(fn) {
      this.queue.push(fn);
    }
   compose() {
      return (ctx, next) => {
        let index = -1;
        const dispatch = (i) => {
          index = i;
          const fn = i === this.queue.length ? next : this.queue[i];
          if (!fn) {
            return Promise.resolve();
          }
          try {
            return Promise.resolve(
              fn(ctx, () => {
                return dispatch(i + 1);
              })
            );
          } catch (error) {
            return error;
          }
        }
        return dispatch(0);
      };
    }
  }
  module.exports = middleWare = new MiddleWareTimer()
