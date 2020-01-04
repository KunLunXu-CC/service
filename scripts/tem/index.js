
const mongo = require('../../utils/mongo');
let mongoDB = null;

const script = async () => {

  let mongoDB = mongo();

  const { id } = await mongoDB.User.findOne({ account: "admin" });
  if (!id){return false}
  console.log('id', id);
  await mongoDB.Article.updateMany({}, { creator: id, updater: id }, {});

  await mongoDB.Tag.updateMany({}, { creator: id, updater: id }, {});

  await mongoDB.Photo.updateMany({}, { creator: id, updater: id }, {});

};

script();
