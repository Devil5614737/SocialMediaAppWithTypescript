import React, {  useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Avatar,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { FaImages } from "react-icons/fa";
import { IAuthContext } from "../interfaces/IAuthContext";
import { AuthContext } from "../context/AuthContext";
import {MdCancel} from 'react-icons/md'

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadPost:(caption:string,photo:string)=>void;
}

export const PostModal = ({uploadPost, isOpen, onClose }: PostModalProps) => {
  const{user}=useContext<IAuthContext>(AuthContext)
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<any>();
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);



  //  post functionality
  const postData = async () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    postData();
  }, [file]);



const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
  setFile(event.target.files ? event.target.files[0] : null)
}



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" alignItems="center">
            <Avatar src={user.user.pic} name="kaushik" mr="12px" />
            <Input
              placeholder="What's on your mind?"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setCaption(e.currentTarget.value)
              }
              value={caption}
            />
          </Box>

         
              <Box
               position='relative'
                mt="15px"
                border="1px dashed grey"
                width="full"
                height="300px"
                borderRadius="5px"
                display="grid"
                placeContent="center"
                cursor="pointer"
              >
                <Box>
                  <label  htmlFor="upload">

                  <FaImages
                  cursor='pointer'
                    color="grey"
                    style={{ margin: "auto", fontSize: 40 }}
                  />
                 <Input onChange={handleChange} display='none' id='upload' type='file'/>
                  </label>
                  <Text cursor="pointer" color="grey">
                    {file
                      ? file.name
                      : " click here to select files"}
                  </Text>
                </Box>
                {/* <Box position='absolute'
                bottom='10px'
                left='10px'>
                <Image 
                 width='70px' height='70px'
                objectFit='cover' src={URL.createObjectURL(file&&file)} alt='post'/>
                <MdCancel style={{
                  position:'absolute',top:0,right:0,cursor:'pointer'
                }}/>
                </Box> */}
                
              </Box>
       
          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={!url}
            onClick={() => uploadPost(url, caption)}
            colorScheme="green"
            variant="outline"
          >
            {loading ? "Uploading...." : "Post"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
