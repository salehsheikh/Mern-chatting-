import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../useravatar/UserListItem';
import UserBadgeItem from '../useravatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast=useToast();
    const {user,chats,setChats}=ChatState();
    const handleSearch=async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }
        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization  :`Bearer ${user.token}`
                },
            };
            const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "error occured",
                status: "warning",
                description:"failed to load the chats",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
            
        }

    }
    const handleSubmit=async()=>{
        if(!groupChatName ||!selectedUsers){
            toast({
                title: "please fill all the fileds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
              return;
        }
        try {
            const config={
                headers:{
                    Authorization  :`Bearer ${user.token}`
                },
            };
            const{data}= await axios.post("http://localhost:5000/api/chat/group",{
                name:groupChatName,
                users:JSON.stringify(selectedUsers.map((u)=>u._id)),
            },config);
            setChats([data,...chats]);
            onClose();
            toast({
                title: "new group chat created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        } catch (error) {
            toast({
                title: "failed to create the group",
                description:error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            
        }

    }
    const handleDelete=(delUser)=>{
      setSelectedUsers(
        selectedUsers.filter((sel)=>sel._id !== delUser._id)
      )
    }
    const handleGroup=(userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: "user already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
              });
            
        }
        setSelectedUsers([...selectedUsers,userToAdd]);

    }
    return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"35px"} fontFamily="sans-serif" display="flex"
        justifyContent="center">create group chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" alignItems="center" >
         <FormControl>
           <Input placeholder='Chat name'mb={3} onChange={(e)=>setGroupChatName(e.target.value)} />
         </FormControl>
         <FormControl>
           <Input placeholder='add users eg :saleh'mr={3} onChange={(e)=>handleSearch(e.target.value)} />
         </FormControl>
         <Box w="100%" display="flex"flexWrap="wrap">
         {selectedUsers.map(u=>(
        <UserBadgeItem key={user._id}user={u}
        handleFunction={()=>handleDelete(u)} />
       ))}
         </Box>
       
         {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={handleSubmit}>
            Create chat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupChatModal
