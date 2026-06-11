import { PubSub, withFilter } from 'graphql-subscriptions';

export const BOT_MATE_MESSAGE_EVENT_TOPIC = 'BOT_MATE_MESSAGE_EVENT';

const pubsub = new PubSub();

export const publishBotMateMessageEvent = (payload) => {
  pubsub.publish(BOT_MATE_MESSAGE_EVENT_TOPIC, {
    botMateMessageEvents: payload,
  });
};

// 订阅 BotMate 消息事件, 通过 withFilter 过滤, 条件为 conversationId 和 userId
export const subscribeBotMateMessageEvents = withFilter(
  () => pubsub.asyncIterableIterator(BOT_MATE_MESSAGE_EVENT_TOPIC),
  (payload, variables, context) => {
    const event = payload.botMateMessageEvents;
    const userId = context?.ctx?.state?.user?.id;

    return (
      String(event.conversationId) === String(variables.conversationId) &&
      String(event.userId) === String(userId)
    );
  },
);
