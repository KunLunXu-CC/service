import mongoose from 'mongoose';
import { BOOLEAN, ROLE_TYPE } from '#config/constants';
import { publishBotMateMessageEvent } from '#service/botMate/messageEvent';

const MESSAGE_ROLE = {
  USER: 'user',
  ASSISTANT: 'assistant',
};

const MESSAGE_EVENT_TYPE = {
  DELTA: 'delta',
  DONE: 'done',
  ERROR: 'error',
};

const getMessageMeta = ({ ctx }) => ({
  creator: ctx?.state.user.id,
  updater: ctx?.state.user.id,
});

const publishMockAssistantReply = ({
  conversationId,
  messageId,
  mateId,
  content,
  runId,
  userId,
}) => {
  publishBotMateMessageEvent({
    type: MESSAGE_EVENT_TYPE.DELTA,
    runId,
    userId,
    conversationId,
    messageId,
    mateId,
    delta: content,
  });

  publishBotMateMessageEvent({
    type: MESSAGE_EVENT_TYPE.DONE,
    runId,
    userId,
    conversationId,
    messageId,
    mateId,
    content,
  });
};

export default async ({ ctx, conversationId, content }) => {
  const BotMateConversation = mongoose.model('BotMateConversation');
  const BotMateMessage = mongoose.model('BotMateMessage');
  const runId = String(new mongoose.Types.ObjectId());

  const data = {
    runId,
    userMessage: null,
    assistantMessage: null,
    message: '发送成功',
  };

  const conversationConds = {
    _id: conversationId,
    isDelete: BOOLEAN.FALSE,
  };

  if (ctx.state.role.type !== ROLE_TYPE.ADMIN) {
    conversationConds.creator = ctx.state.user.id;
  }

  const conversation = await BotMateConversation.findOne(conversationConds);

  if (!conversation) {
    data.message = '会话不存在';
    return data;
  }

  const [mateId] = conversation.mateIds || [];
  const now = Date.now();

  data.userMessage = await BotMateMessage.create({
    conversationId,
    content,
    role: MESSAGE_ROLE.USER,
    ...getMessageMeta({ ctx }),
  });

  const mockContent = `Mock Mate 回复: ${content}`;

  data.assistantMessage = await BotMateMessage.create({
    conversationId,
    mateId,
    content: mockContent,
    role: MESSAGE_ROLE.ASSISTANT,
    ...getMessageMeta({ ctx }),
  });

  await BotMateConversation.updateOne(
    { _id: conversation.id },
    {
      $set: {
        lastMessage: mockContent,
        lastMessageAt: now,
        updateTime: now,
        updater: ctx?.state.user.id,
      },
    },
  );

  const mockReplyParams = {
    content: mockContent,
    conversationId,
    messageId: data.assistantMessage.id,
    runId,
    userId: ctx.state.user.id,
  };

  if (mateId) {
    mockReplyParams.mateId = String(mateId);
  }

  publishMockAssistantReply(mockReplyParams);

  return data;
};
