#打开定时任务表
crontab -e

#插入一条任务
 */8 * * *  /home/mwxz/restart_mwxz.sh > /home/mwxz/loginfo.log 2>&1
