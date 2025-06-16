NODE_ENV=production pm2 start 1.js -n app
pm2 set pm2-logrotate:max_size 20480M
# pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
# pm2 set pm2-logrotate:rotateInterval 0 0 * * *
# pm2 set pm2-logrotate:rotateModule true
# pm2 update
pm2 conf
