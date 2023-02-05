#!/bin/bash

RET=$(http POST http://localhost:6600/login username=jartsa password=joo Content-Type:application/json)
TOKEN=$(echo $RET | jq '.token' | tr -d '"') 
#echo $TOKEN


http http://localhost:6600/product/2/49 x-token:$TOKEN