import { Box, Container ,Tab,Tabs,TabList,TabPanels,TabPanel,Text} from "@chakra-ui/react";
import React, { useEffect } from "react";
import SignUp from "../components/authentication/SignUp";
import Login from "../components/authentication/Login";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate=useNavigate();
  useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("UserInfo"));
      if(user){
        console.log(user);
          navigate("/chats");
      }
  },[navigate]);
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl"fontFamily={"sans-serif"} color={"black"}>Talk a Tive</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth='1px' color="black">
      <Tabs variant='soft-rounded'>
  <TabList mb='1em'>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">SignUp</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
