import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    Box,
    Divider,
    Avatar,
    Text,
  } from '@chakra-ui/react'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IAuthContext } from '../interfaces/IAuthContext';


  interface Props{
    isOpen: boolean;
    onClose: () => void;
}

export const UserDrawer=({isOpen,onClose}:Props)=>{
    const[query,setQuery]=useState<string>('')
    const {searchUsers,searchResults}=useContext<IAuthContext>(AuthContext)
    return(
<Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
    
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search users by  name or email</DrawerHeader>

          <DrawerBody>
            <Box display='flex' alignItems='center'> <Input mr='12px' display='inline' placeholder='Type here...' onChange={(e:React.FormEvent<HTMLInputElement>)=>setQuery(e.currentTarget.value)} value={query}/>
            <Button onClick={()=>{searchUsers(query) 
                setQuery('')}} bg='#0072FF' color='white'  variant='solid'>Search</Button></Box>
         <Divider/>
        <Box mt='22px'>
        {searchResults?searchResults.map(results=>  <Box key={results._id}  display='flex' alignItems='center' mb='12px'>
            <Avatar src={results.pic} name='kaushik'/>
            <Text ml='7px'>{results.username}</Text>
         </Box>):<Text>No user found</Text>}
         
        </Box>
       
          </DrawerBody>

          <DrawerFooter>
         
            <Button onClick={onClose} colorScheme='red' color='white'>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}