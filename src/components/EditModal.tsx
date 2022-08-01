import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text
  } from '@chakra-ui/react'
import React, {  useEffect, useState } from 'react';


interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    updateUsername:(text:string,url:string)=>void;
}


export const EditModal=({isOpen,onClose,updateUsername}:ModalProps)=>{
const[file,setFile]=useState<any>();
const[text,setText]=useState<string>('');
const[url,setUrl]=useState<string>('');

const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setFile(event.target.files ? event.target.files[0] : null)
  }
  

  const postData = async () => {

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tzo42pxi");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // eslint-disable-next-line
  useEffect(()=>{
postData();
  },[file])


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <label htmlFor='upload' style={{cursor:'pointer'}}>
            Click here to update image
            <Input type='file' id='upload' display='none' onChange={handleChange}/>
            <Text color='grey' mt='5px' ml='12px'>{file?.name}</Text>
           </label>
           <Input value={text} onChange={(e:React.FormEvent<HTMLInputElement>)=>setText(e.currentTarget.value)} mt='12px' type='text' placeholder='Edit Username'/>
          </ModalBody>
    
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button disabled={!url} onClick={()=>updateUsername(text,url)} variant='ghost'>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
   
}