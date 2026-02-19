import { ChatBoxInfo } from '@/types';
import ChatContainer from '@components/chatAI/ChatContainer';

export interface ChatAIProps {
  chatBoxInfo: ChatBoxInfo;
}

const ChatAI = ({ chatBoxInfo }: ChatAIProps) => {
  return <ChatContainer chatBoxInfo={chatBoxInfo} />;
};

export default ChatAI;
