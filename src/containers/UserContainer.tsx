import { Avatar, Box, Button, Link, Text } from "@chakra-ui/react";
import { useContext} from "react";
import {FaPlus} from 'react-icons/fa';
import { AuthContext } from "../context/AuthContext";
import {IAuthContext} from "../interfaces/IAuthContext";

export const UserContainer=()=>{
const {users,addFriend}=useContext<IAuthContext>(AuthContext);


    return(
        <Box className="grid3" top='70px' position='sticky'  padding='1.5em' bg='white'  height={300}>
        <Text fontWeight='bold'>People you may know</Text>
        {users.slice(0,4).map(user=><Box key={user._id} marginTop='12px' marginBottom='12px'>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Avatar src={user.pic} name='kaushik' size='sm'/>
            <Text>{user.username}</Text>
            <Button onClick={()=>addFriend(user._id)} bg='#E0EEFF' borderRadius='100%'><FaPlus color="#0072FF" style={{fontSize:12}}/></Button>
          </Box>
        </Box>)}
    
        <Link display='flex' justifyContent='center' href="#!" m='auto'>see all </Link>
      </Box>
    )
}