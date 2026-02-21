import { FullChatBoxData } from '@/types';
import ChatContainer from '@components/chatAI/ChatContainer';

export interface ChatAIProps {
  chatBoxData: FullChatBoxData;
  locale: string;
}

const ChatAI = ({ chatBoxData, locale }: ChatAIProps) => {
  return <ChatContainer chatBoxData={chatBoxData} locale={locale} />;
};

export default ChatAI;
