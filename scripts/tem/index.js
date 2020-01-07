const mongo = require('../../utils/mongo');
const { BOOLEAN } = require('../../config/consts');
const mongoDB = mongo();

const script = async () => {
  const { id, auth } = await mongoDB.Role.findOne({ name : 'admin' });
  if (!id){return false;}
  console.log('-------->>> 更新 admin 权限');
  await mongoDB.Role.updateMany({ _id: id }, {
    auth: [ ... auth, {
      code: 'lift', readable: BOOLEAN.TRUE, writable:BOOLEAN.TRUE
    }]
  }, {});
  console.log('--->>> 更新 admin 权限成功');

  console.log('----->>> 修改 ES6 icon');
  await mongoDB.Tag.updateMany({ name: "ES6" }, { icon: "icon-js" }, {});
  console.log('----->>> 修改 ES6 icon 成功');

};

script();
