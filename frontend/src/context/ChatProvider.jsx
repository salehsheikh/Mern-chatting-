import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext=createContext();
const ChatProvider=({children})=>{
    const navigate=useNavigate();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("UserInfo"));
        setUser(userInfo);
        console.log(userInfo);
        if(!userInfo){
            navigate("/")
        }
    },[navigate]);
    return(
        <ChatContext.Provider value={{user,setUser,selectedChat, setSelectedChat,chats, setChats}}>{children}</ChatContext.Provider>
    )
};
export const ChatState=()=>{
    return useContext(ChatContext);
}

export default ChatProvider;