import { ChatBoxInfo } from '@/types';
import ChatContainer from '@components/chatAI/ChatContainer';

export interface ChatAIProps {
  chatBoxInfo: ChatBoxInfo;
  locale: string;
}

const ChatAI = ({ chatBoxInfo, locale }: ChatAIProps) => {
  return <ChatContainer chatBoxInfo={chatBoxInfo} locale={locale} />;
};

export default ChatAI;
