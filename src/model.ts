import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({
  model: "deepseek-reasoner",
  temperature: 0,
});

export default model;