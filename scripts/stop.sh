#!/bin/sh

app_id=`ps -ef | grep "node weather_ui_server.js" | grep -v "grep" | awk '{print $2}'`
echo $app_id

for id in $app_id
do
    kill -9 $id  
    echo "killed $id"  
done
