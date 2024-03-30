
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import ChatBox from '../components/miscalleaneous/ChatBox';
import MyChats from '../components/miscalleaneous/MyChats';
import SideDrawer from '../components/miscalleaneous/SideDrawer';

const ChatPage = () => {
  const{user}=  ChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display="flex"
      justifyContent="space-between"
      width="100%"
      h="91.5vh"p="10px">
        {user && <MyChats/>}
        {user &&<ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatPage
