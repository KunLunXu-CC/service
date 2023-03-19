import { Configuration, OpenAIApi  } from 'openai';
import system from '#config/system';

const configuration = new Configuration({
  apiKey: system.openaiApiKey,
});

const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'js Map 类型怎么用' }],
});

console.log(completion.data.choices[0].message);
