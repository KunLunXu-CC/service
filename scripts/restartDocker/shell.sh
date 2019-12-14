#!/bin/bash

# 备份数据库 （不能用）
echo "1. 开始备份数据库 ----->>>>>"
## 1. 备份数据库
sudo docker exec blog-mongo sh -c "mongodump -d blog -o /tmp/mongo-bak"

## 2. 拷贝备份文件到本地
sudo docker cp blog-mongo:/tmp/mongo-bak/blog /tmp/mongo-bak
echo "1. 完成数据库备份 <<<<<-----"

# 删除所有项目相关容器
echo "2. 开始删除所有项目相关容器 ----->>>>>"
## 1. 删除所有容器
sudo docker rm -f $(sudo docker ps -a -q)

## 2. 删除 sudo dockerfile 创建的镜像
sudo docker rmi -f docker_node docker_mongo

## 3. 删除当前 store
sudo rm -rf ~/blog/docker/store
echo "2. 所有项目相关容器删除成功 <<<<<-----"

# 重新运行容器
echo "3. 重新运行容器 ----->>>>>"
cd ~/blog/docker/ && sudo docker-compose up -d
echo "3. 运行容器成功 <<<<<-----"

# 导入数据
echo "4. 开始导入数据 ----->>>>>"
## 1. 拷贝备份文件到容器内: mongo-bak 是个文件夹(tar包不懂信不信未测试))
sudo docker cp /tmp/mongo-bak blog-mongo:/tmp/mongo-bak

## 2. 恢复数据库
sudo docker exec blog-mongo sh -c 'mongorestore -d blog --drop /tmp/mongo-bak'

## 3. 删除容器内备份
sudo docker exec blog-mongo sh -c 'rm -rf /tmp/mongo-bak'

## 4. 删除本地备份文件
sudo rm -rf /tmp/mongo-bak
echo "4. 导入数据成功 ----->>>>>"

echo "----- 脚本结束 -----"
