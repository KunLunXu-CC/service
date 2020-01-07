const mongo = require('../../utils/mongo');
const { BOOLEAN } = require('../../config/consts');
const mongoDB = mongo();

const script = async () => {
  const { id, auth } = await mongoDB.Role.findOne({ name : 'admin' });
  if (!id){return false;}
  console.log('-------->>> 更新 admin 权限');
  const _auth = auth.map(v => {
    if (v.code === 'lift'){
      v.code = 'diary'
    }
    return v;
  });

  await mongoDB.Role.updateMany({ _id: id }, {
    auth: _auth
  }, {});
  console.log('--->>> 更新 admin 权限成功');
};

script();
