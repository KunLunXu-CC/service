# cat /home/crontab/mongod_bak.sh #新建文件，输入以下代码
# #!/bin/sh

# # DAYS=7代表删除7天前的备份，即只保留最近7天的备份
# DAYS=7

# # mongodump备份文件执行路径
# DUMP=/usr/local/mongodb/bin/mongodump

# # 临时备份目录
# OUT_DIR=/home/backup/mongod_bak/mongod_bak_now

# # 备份存放路径
# TAR_DIR=/home/backup/mongod_bak/mongod_bak_list

# # 获取当前系统时间
# DATE=`date +%Y_%m_%d`

# DB_USER=username #数据库账号

# DB_PASS=123456 #数据库密码

# TAR_BAK="mongod_bak_$DATE.tar.gz" #最终保存的数据库备份文件名

# cd $OUT_DIR

# rm -rf $OUT_DIR/*

# mkdir -p $OUT_DIR/$DATE

# #  mongodump -d blog -o /home/db
# $DUMP -u $DB_USER -p $DB_PASS -o $OUT_DIR/$DATE #备份全部数据库

# tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE #压缩为.tar.gz格式

# find $TAR_DIR/ -mtime +$DAYS -delete #删除7天前的备份文件

# 自定义

# 参数配置
LIFE_DAYS=7                           # 存活时长, 备份存储时长
BACKUP_DIR=/data/backups              # 备份路径
DB_NAME=blog                          # 数据库名
DATE=`date +%Y_%m_%d_%H_%M_%S`        # 获取当前系统时间
FILE_NAME="mongod_bak_$DATE.tar.gz"   # 文件名


# 1. 备份
mongodump -d $DB_NAME -o $BACKUP_DIR

# 2. 压缩
tar -zcvf $BACKUP_DIR/$FILE_NAME $BACKUP_DIR/$DB_NAME

# 3. 删除
rm -rf $BACKUP_DIR/$DB_NAME

# 4. 删除指定天数前的备份
find $BACKUP_DIR/ -mtime +$LIFE_DAYS -delete
