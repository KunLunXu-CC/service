const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const gulp = require('gulp');
const mongo = require('../../utils/mongo');
const { requireFiles } = require('../../utils');

// 解析
const parse = (text) => {
  const tagReg = /> tag:(.*?)\n+/i;
  const descReg = /> desc:(.*?)\n+/i;
  const tags = _.trim(_.get(tagReg.exec(text), [1], ''));
  const desc = _.trim(_.get(descReg.exec(text), [1], ''));
  const content = text.replace(tagReg, '').replace(descReg, '');
  return { tags: JSON.parse(tags), desc, content };
};

// 导入数据
const insert = async (files) => {
  const mongoDb = mongo();
  const { Note, Tag } = mongoDb;
  const data = [];

  // 1. 处理数据
  for(let key in files){
    const { tags, desc, content } = files[key];
    const tagIds = [];
    for(let i = 0; i < tags.length; i++){
      const id = (await Tag.findOne({ name: tags[i] }) || {}).id;
      id && tagIds.push(id);
    }
    data.push({
      desc,
      content,
      name: key,
      tags: tagIds,
    });
  }

  // 2. 插入或更新数据
  for(let i = 0; i < data.length; i++){
    const note = await Note.findOne({ name: data[i].name });
    note ? await Note.update(
      {_id: note.id},
      { content: `${note.content}\n${data[i].content}` }
    ) : await Note.insertMany(data[i]);
  }
}

module.exports = async () => {
  const files = requireFiles({
    dir: path.resolve(__dirname, '.'),
    suffix: 'md',
    handler: (dest) => parse(fs.readFileSync(dest, 'utf-8')),
  });
  insert(files);
}
