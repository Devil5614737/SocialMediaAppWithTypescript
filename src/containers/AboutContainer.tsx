import { Box, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import {  useEffect, useState } from "react";


import { User } from "../interfaces/IAuthContext";

const token = JSON.parse(localStorage.getItem("currentUser") || "").token;



export const AboutContainer = () => {
const[user,setUser]=useState<User>()


const fetchUsers=async()=>{
  axios.get('https://socialmediatypescript.herokuapp.com/api/me',{
    headers:{
      'x-auth-token':token
    }
  }).then(res=>setUser(res.data)).catch(e=>console.log(e))
}

useEffect(()=>{
  fetchUsers()
},[])


  return (
    <Box
      className="grid1"
      padding="1.5em"
      bg="white"
      top="70px"
      position="sticky"
      height="300px"
    >
      <Image
        m="auto"
        objectFit="cover"
        width="90px"
        height="90px"
        src={user?.pic}
        alt="user"
      />

      <Text
        mt="12px"
        mb="12px"
        fontWeight="bold"
        fontSize="xl"
        textAlign="center"
      >
        {user?.username}
      </Text>
      <Box marginTop="5px" display="flex" justifyContent="center">
        <Box>
          <Text textAlign="center" fontWeight="bold">
            {user?.friends.length}
          </Text>
          <Text color="#787878">Friends</Text>
        </Box>
      </Box>
    </Box>
  );
};
