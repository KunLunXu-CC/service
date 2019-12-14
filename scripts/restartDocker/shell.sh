#!/bin/bash

# 备份数据库
## 1. 备份数据库
docker exec blog-mongo sh -c "mongodump -d blog -o /tem/mongo-bak"

## 2. 拷贝备份文件到本地
docker cp blog-mongo:/tem/mongo-bak/blog /tem/mongo-bak

# 删除所有项目相关容器
## 1. 删除所有容器
docker rm -f $(docker ps -a -q)

## 2. 删除 dockerfile 创建的镜像
docker rmi -f docker_node docker_mongo

## 3. 删除当前 store
rm -rf ~/blog/docker/store

# 重新运行容器
cd ~/blog/docker/ && docker-compose up -d

# 导入数据
## 1. 拷贝备份文件到容器内: mongo-bak 是个文件夹(tar包不懂信不信未测试))
docker cp /tem/mongo-bak blog-mongo:/tem/mongo-bak

## 2. 恢复数据库
docker exec blog-mongo sh -c 'mongorestore -d blog --drop /tem/mongo-bak'

## 3. 删除容器内备份
docker exec blog-mongo sh -c 'rm -rf /tem/mongo-bak'

## 4. 删除本地备份文件
rm -rf /tem/mongo-bak
