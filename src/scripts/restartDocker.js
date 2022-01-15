import { $ } from 'zx';

export default {
  name: '重启 Docker',
  exec: async () => {
    $`
      echo "----- 脚本开始 -----"
      # 删除所有项目相关容器
      echo "1. 开始删除所有项目相关容器 ----->>>>>"
      ## 1. 删除所有容器
      sudo docker rm -f $(sudo docker ps -a -q)

      ## 2. 删除 sudo dockerfile 创建的镜像
      sudo docker rmi -f docker_node docker_mongo

      echo "1. 所有项目相关容器删除成功 <<<<<-----"

      # 重新运行容器
      echo "2. 重新运行容器 ----->>>>>"
      cd ~/blog/docker/ && sudo docker-compose up -d
      echo "2. 运行容器成功 <<<<<-----"

      echo "----- 脚本结束 -----"
    `;
  },
};
