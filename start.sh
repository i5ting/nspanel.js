#! /bin/bash

grunt clean
grunt concat
grunt uglify

ps -ef|grep ruby|grep 5001|awk '{print $2}'|xargs kill -9

ruby -run -e httpd . -p 5001 &

sleep 2

open 'http://127.0.0.1:5001/demo'
