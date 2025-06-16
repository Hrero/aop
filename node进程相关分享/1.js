// ps -o pid,ppid,state,tty,command | grep 'node'

// R运行状态(running): 并不意味着进程一定在运行中，它表明进程要么是在运行中要么在运行队列里。
// S睡眠状态(sleeping): 意味着进程在等待事件完成(这里的睡眠有时候也叫做可中断睡眠 interruptible sleep)
// D磁盘休眠状态(Disk sleep): 有时候也叫不可中断睡眠状态（uninterruptible sleep），在这个状态的进程通常会等待IO的结束
// T停止状态(stopped): 可以通过发送 SIGSTOP 信号给进程来停止（T）进程。这个被暂停的进程可以通过发送 SIGCONT 信号让进程继续运行
// X死亡状态(dead): 这个状态只是一个返回状态，你不会在任务列表里看到这个状态。
// Z僵死状态(zombie)

1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
