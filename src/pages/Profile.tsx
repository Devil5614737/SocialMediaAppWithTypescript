import {
  Box,
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { BsGrid1X2Fill } from "react-icons/bs";
import { AiFillLike, AiTwotoneEdit } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { Post } from "../interfaces/IPostContext";
import {  User } from "../interfaces/IAuthContext";

import { EditModal } from "../components/EditModal";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("currentUser") || "").token;

function Profile() {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const[myPost,setMyPost]=useState<Post[]>([])
  const [user, setUser] = useState<User>();
  const[fetchProfilePost,setFetchProfilePost]=useState<boolean>(false)
  const toast=useToast();

  const handleMyPost = async () => {
    axios
      .get("http://localhost:4000/api/myPost", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setMyPost(res.data.mypost))
      .catch((error) => console.log(error));
  };
  const fetchCurrentUser = async () => {
    axios
      .get("http://localhost:4000/api/me", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleMyPost();
    fetchCurrentUser()
    return ()=>setFetchProfilePost(false)
  }, [fetchProfilePost]);




  async function handleRemovePost(postId: string) {
    setFetchProfilePost(true);
  
    fetch('http://localhost:4000/api/removePost',{
        method:'DELETE',
        body:JSON.stringify({
          postId
        }),
        headers:{
          'Content-Type':'application/json',
          'x-auth-token':token
        }
      })
    

    } 
  


const updateUsername=(text:string,url:string)=>{
  setFetchProfilePost(true);
axios.put('http://localhost:4000/api/updateUsername',{username:text?text:user?.username,pic:url},{
  headers:{
    'x-auth-token':token
  }
}).then(res=>{
  if(res.data){
    onClose();
    toast({
      title: "username updated 🚀🚀",
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    
  }
}).catch(error=>console.log(error))
}

  return (
    <>
      <Navbar />
      <Box padding=".5em 1em">
        <Box
          padding="2em"
          display="grid"
          m="auto"
          maxWidth="1100px"
          backgroundColor="white"
          borderRadius="6px"
        >
          <Image
            m="auto"
            height="100px"
            width="100px"
            borderRadius="100%"
            objectFit="cover"
            src={user?.pic}
            alt="user"
          />
          <Text textAlign="center" fontWeight="bold" fontSize="2xl" mb="12px">
            {user?.username}
          </Text>
          <Button onClick={onOpen} display="flex" alignItems="center" m="auto">
            <AiTwotoneEdit style={{ marginRight: 6 }} />
            Edit Profile
          </Button>
        </Box>
      </Box>
      <Box padding=".5em 1em">
        <Box m="auto" maxWidth="1100px">
          <Text
            fontSize="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Posts
            <BsGrid1X2Fill style={{ marginLeft: "5px" }} />
          </Text>
          <Box className="postContainer" mt="12px">
            {myPost.map((post) => (
              <Box key={post._id} className="post">
                <Popover>
                  <PopoverTrigger>
                    <Button>
                      {" "}
                      <BsThreeDots
                        style={{
                          float: "right",
                          fontSize: "1.3em",
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Delete!</PopoverHeader>
                    <PopoverBody>
                      <Button
                        onClick={() => handleRemovePost(post._id)}
                        bg="red"
                        color="white"
                      >
                        Delete
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Image
                  mt="8px"
                  w="full"
                  objectFit="cover"
                  src={post.photo}
                  alt="post"
                />
                <Box mt="8px" className="info">
                  <Text
                    fontSize="sm"
                    mr="12px"
                    display="flex"
                    alignItems="center"
                  >
                    <AiFillLike style={{ marginRight: "5" }} />
                    Likes({post.likes.length})
                  </Text>
                  <Text fontSize="sm" display="flex" alignItems="center">
                    <FaComment style={{ marginRight: "5" }} />
                    Comments({post.comments.length})
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <EditModal isOpen={isOpen} onClose={onClose} updateUsername={updateUsername}/>
    </>
  );
}

export default Profile;
