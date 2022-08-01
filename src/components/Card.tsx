import { Avatar, Box, Button, Image, Input, Skeleton, Text } from "@chakra-ui/react";
import {FaThumbsUp,FaComment} from 'react-icons/fa';
import {AiOutlineSend} from 'react-icons/ai';
import { PostContext } from "../context/PostContext";
import { Comments, IPostContext, Post } from "../interfaces/IPostContext";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IAuthContext } from "../interfaces/IAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface CardProps{
  id:string;
  photo:string;
  caption:string;
  liked:boolean;
  comments:Comments[];
  post:Post,
  likes:number,
  time:string,
  handleLike:(post:Post,postId:string)=>void,
  handleComment:(text:string,postId:string)=>void
}

export const Card=({time,id,photo,caption,comments,liked,post,likes,handleComment,handleLike}:CardProps)=>{
  const{loading}=useContext<IPostContext>(PostContext);
  const{user}=useContext<IAuthContext>(AuthContext);
  const[text,setText]=useState<string>('');


    return (
      loading?<Skeleton>
 <Box bg='white' marginTop='22px' padding='1.8em'>

<Box marginBottom='10px' display='flex' alignItems='center' >
  <Avatar src='' name='Kaushik' marginRight='7px'/>
  <p style={{fontWeight:'600'}}>Blackstorm</p>
</Box>
<Text color='#535353' marginBottom='10px' fontSize='md'>{caption}</Text>
<Image height='300px' objectFit='cover' src={photo} alt='Dan Abramov' w='full' borderRadius='10px'/>
<Box marginTop='10px' color='#6F6969' display='flex' alignItems='center'>
  <Box cursor='pointer' display='flex' alignItems='center' marginRight='12px'>
<FaThumbsUp/>
<p  style={{marginLeft:'4px'}}>Like(21)</p>

  </Box>
  <Box cursor='pointer'  display='flex' alignItems='center'>
<FaComment />
<p  style={{marginLeft:'4px'}}>comments(21)</p>

  </Box>
</Box>
<Box marginTop='27px' display='flex' alignItems='center'>
  <Avatar marginRight='10px' size='sm' src='' name='kaushik'/>
  <Input bg='#E7E7E7' marginRight='10px' placeholder='Add a comment..'/>
  <Button bg='#0072FF'><AiOutlineSend color='white'/></Button>
</Box>
<Box marginTop='12px' >
  <Box display='flex'>
  <Avatar marginRight='10px' size='sm' src='' name='kaushik'/>
  <Box bg='#E7E7E7'  padding='.8em' borderRadius='10px'>
    <Text fontWeight='bold'>Blackstorm</Text>
    <Text color='#626262' fontSize='sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nisi ipsam vero exercitationem temporibus obcaecati, corporis laboriosam deleniti maxime perspiciatis?</Text>

  </Box>
  </Box>
</Box>
</Box>
      </Skeleton>:
        <Box bg='white' marginTop='22px' padding='1.8em'>

<Box marginBottom='10px' display='flex' alignItems='center' >
  <Avatar src={post.postedBy.pic} name='Kaushik' marginRight='7px'/>
  <p style={{fontWeight:'600',marginRight:7}}>{post.postedBy.username}</p>
  <div style={{height:5,width:5,borderRadius:'100%',backgroundColor:"#6F6969",marginRight:7}}></div>
  <p style={{fontWeight:'600',fontSize:11,color:'#6F6969'}}>{formatDistanceToNow(new Date(time),{addSuffix:true})}</p>
</Box>
<Text color='#535353' marginBottom='10px' fontSize='md'>{caption}</Text>
<Image loading="lazy" height='300px' objectFit='cover' src={photo} alt='Dan Abramov' w='full' borderRadius='10px'/>
<Box marginTop='10px' color='#6F6969' display='flex' alignItems='center'>
  <Box onClick={()=>handleLike(post,id)} color={liked?'blue':'#6F6969'} cursor='pointer' display='flex' alignItems='center' marginRight='12px'>
<FaThumbsUp/>
<p  style={{marginLeft:'4px'}}>{liked?'Liked':'Like'}({likes})</p>

  </Box>
  <Box cursor='pointer'  display='flex' alignItems='center'>
<FaComment />
<p  style={{marginLeft:'4px'}}>comments({comments.length})</p>

  </Box>
</Box>
<Box marginTop='27px' display='flex' alignItems='center'>
  <Avatar marginRight='10px' size='sm' src={user.user.pic} name='kaushik'/>
  <Input value={text} onChange={(e:React.FormEvent<HTMLInputElement>)=>setText(e.currentTarget.value)} bg='#E7E7E7' marginRight='10px' placeholder='Add a comment..'/>
  <Button onClick={()=>handleComment(text,id)}  bg='#0072FF'><AiOutlineSend color='white'/></Button>
</Box>
<Box marginTop='12px' >
  {comments.map(comment=><Box key={comment._id} mb='12px' display='flex'>
  <Avatar marginRight='10px' size='sm' src={comment.postedBy.pic} name='kaushik'/>
  <Box bg='#E7E7E7'  padding='.8em' borderRadius='10px'>
    <Text fontWeight='bold'>{comment.postedBy.username}</Text>
    <Text color='#626262' fontSize='sm'>{comment.text}</Text>

  </Box>
  </Box>)}
</Box>


</Box>
    )
}