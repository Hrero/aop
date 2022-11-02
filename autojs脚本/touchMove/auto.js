"auto";
log("*****************");
for(var i = 1; i < 1000 ;i++){
    log("watch it "+ i + " times")
    // sleepTime 20-30 或 6-8
    //sleepTime = randomRangeTime(6,8);
    sleepTime = randomRangeTime(15,30);
    log("watch " + sleepTime/1000 + "s");
    sleep(sleepTime);
    // slidingByLine();
    


    getSwipePoint(
        randomPointLoc(180, 210),
        randomPointLoc(800, 1200),
        randomPointLoc(180, 220),
        randomPointLoc(380, 420)
    )
    log("*****************");
}
log("exit...");
sleep(2000);

/**
 * 
 * @param {*} x1 
 * @param {*} x2 
 * @param {*} y1 
 * @param {*} y2 
 * @param {*} z1 
 */
function getSwipePoint(x1, y1, x2, y2) {
    // swipe(x1, y1, x2, y2, 500);
    swipe(200, 1000, 210, 400, 500);
}

/**
 * 随机位置点
 * @param {起始值} start 
 * @param {结束值} end 
 * @returns 
 */
 function randomPointLoc(start, end){
    len = end -start; 
    loc = Math.floor(Math.random() * len) + start;
    return loc;
}

/**
 * 从几秒到几秒
 * @param {开始秒} start 
 * @param {结束秒} end 
 * @returns
 */
 function randomRangeTime(start,end){
    len = (end -start)*1000; 
    ms = Math.floor(Math.random() * len) + start*1000;
    return ms;
}
 