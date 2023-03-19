import { PassThrough } from 'stream';
import { Configuration, OpenAIApi  } from 'openai';
import system from '#config/system';


// 封装方法
const getOpenai =  async ({ stream, messages }) => {
  const configuration = new Configuration({
    apiKey: system.openaiApiKey,
  });

  const openai = new OpenAIApi(configuration);

  // 开启 stream 配置并设置 responseType
  const completion = await openai.createChatCompletion({
    messages,
    stream: true,
    model: 'gpt-3.5-turbo',
  },  { responseType: 'stream' });

  // 监听事件
  completion.data.on('data', (data) => {
    try {
      // 对每次推送的数据进行格式化, 得到的是 JSON 字符串、或者 [DONE] 表示流结束
      const message = data
        .toString()
        .trim()
        .replace(/^data:\s/, '');

      // 流结束
      if (message === '[DONE]') {
        stream.write('data: [DONE]\n\n');
        return;
      }

      console.log(message);

      // 解析数据
      const parsed = JSON.parse(message);


      // 写入流
      stream.write(`data: ${parsed.choices[0].delta.content || ''}\n\n`);
    } catch (e) {
      console.log(e);
      // 出现错误, 结束流
      stream.write('data: [DONE]\n\n');
    }
  });
};

export default async (ctx) => {
  const stream = new PassThrough();

  ctx.set({
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
  });

  ctx.body = stream;
  ctx.status = 200;

  // 调用 openai 写入流
  getOpenai({ stream, messages: [{ role: 'user', content: ctx.request.query.message }] });
};
