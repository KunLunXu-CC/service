# #!/bin/sh

# 参数配置
LIFE_DAYS=7                          # 存活时长, 备份存储时长
BACKUP_DIR=/data/backups              # 备份路径
DB_NAME=blog                          # 数据库名
DATE=`date +%Y_%m_%d_%H_%M`           # 获取当前系统时间
FILE_NAME="mongod_bak_$DATE.tar.gz"   # 最终备份出来的压缩包文件名

# 1. 备份
mongodump -d $DB_NAME -o $BACKUP_DIR

# 2. 进入备份目录
cd $BACKUP_DIR

# 3. 打包
tar -zcvf $BACKUP_DIR/$FILE_NAME ./$DB_NAME/*

# 4. 删除
rm -rf $BACKUP_DIR/$DB_NAME

# 5. 找到指定天数前的备份并删除
find $BACKUP_DIR/ -mtime +$LIFE_DAYS -delete
