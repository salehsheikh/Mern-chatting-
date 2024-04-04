import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from "@chakra-ui/react";
  import { useToast } from "@chakra-ui/react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import { ChatState } from '../../context/ChatProvider';
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
  const toast = useToast();
    const handleClick=()=>{
      setShow(!show);
    };
    const { setUser } = ChatState();
    const submitHandler =async () => {
      setLoading(true);
      if(!email|| !password){
        toast({
          title: "please fill all the required fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false)
        return;
      };
     
    try {
      const config={
       headers:{
        "Content-type":"application/json",
       },
      };
      const{data}= await axios.post("http://localhost:5000/api/user/login",
      {email,password},
      config);
      toast({
        title: "login succesfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("UserInfo",JSON.stringify(data));
      setLoading(false)
      navigate("/chats")
    } catch (error) {
      toast({
        title: "error warning",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
          type={show ? "text" : "password"}
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>

          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue"
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler} isLoading={loading}>Login</Button>
      <Button variant="solid" colorScheme='red'width="100%" onClick={()=>{
        setEmail("guest@example.com");
        setPassword("123456")
      }}>
        Get user credentials
      </Button>
    </VStack>
  )
}

export default Login
