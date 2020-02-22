#!/bin/sh

app_id=`ps -ef | grep "weather_ui_log.log" | grep -v "grep" | awk '{print $2}'`
echo $app_id

for id in $app_id
do
    kill -9 $id  
    echo "killed $id"  
done
