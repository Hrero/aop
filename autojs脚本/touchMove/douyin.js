// auto.waitFor()
var appName = "抖音";
// (appName);
text("首页").waitFor();
toast("准备开始滑动")
while (true) {
    Swipe(200, 1000, 210, 400, 500);
    sleep(5000);
    toast("继续滑动。。。")
}
