#!/bin/bash

JAVA_COMMAND="java"
JAVA_ARGS="-jar /home/mwxz/mwxz.jar"
JAVA_NAME="mwxz.jar"

restart_java_process() {

  if pgrep -f "$JAVA_NAME" >/dev/null; then
    echo "停止java进程"
    pkill -f "$JAVA_NAME"
    sleep 5
  fi
  echo "后台启动java进程"
  nohup "$JAVA_COMMAND" $JAVA_ARGS >/home/mwxz/mwxz.log 2>&1 &
}



restart_java_process
