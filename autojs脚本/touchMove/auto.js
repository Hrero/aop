"auto";
var { has_text } = require('lib.js')
var contentSum = 0;
// click(600, 700) // 评论
// click(600, 900) // 收藏
// 精准粉丝

for (var i = 1; i < 1000; i++) {
    log("*****************");
    getSwipePoint(
      randomPointLoc(180, 210),
      randomPointLoc(1000, 1200),
      randomPointLoc(180, 220),
      randomPointLoc(200, 300)
    );
    sleep(randomRangeTime(2, 4));
    addContent()()
    sleep(randomRangeTime(2, 4));
    log("*****************");
}

function addContent() {
    return function() {
        click(600, 700) // 评论
        sleep(2000)
        click(350, 1200)
        sleep(2000)
        setClip()
        sleep(2000)
        setClip('点我头像，每日好物推荐哦~')
        sleep(2000)
        click(300, 800) // 发送评论
        sleep(2000)
        click(600, 600)
        sleep(2000)
        click(350, 50) // 关闭弹窗
        contentSum++
        log('已发送了', contentSum)
    }
}

/**
 *
 * @param {*} x1
 * @param {*} x2
 * @param {*} y1
 * @param {*} y2
 * @param {*} z1
 */
function getSwipePoint(x1, y1, x2, y2) {
  swipe(x1, y1, x2, y2, 500);
}

/**
 * 随机位置点
 * @param {起始值} start
 * @param {结束值} end
 * @returns
 */
function randomPointLoc(start, end) {
  len = end - start;
  loc = Math.floor(Math.random() * len) + start;
  return loc;
}/**
 * 从几秒到几秒
 * @param {开始秒} start
 * @param {结束秒} end
 * @returns
 */
function randomRangeTime(start, end) {
  len = (end - start) * 1000;
  ms = Math.floor(Math.random() * len) + start * 1000;
  return ms;
}
