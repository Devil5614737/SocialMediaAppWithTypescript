import {
  Avatar,
  Box,
  Button,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { UserContainer } from "../containers/UserContainer";
import { PostModal } from "../components/PostModal";
import { AboutContainer } from "../containers/AboutContainer";
import { FaImage } from "react-icons/fa";
import { BsFillCameraVideoFill, BsFillEmojiSmileFill } from "react-icons/bs";
import {  useContext, useEffect, useState } from "react";

import { Post } from "../interfaces/IPostContext";
import { AuthContext } from "../context/AuthContext";
import { IAuthContext } from "../interfaces/IAuthContext";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem("currentUser") || "").token;

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext<IAuthContext>(AuthContext);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLiked, setIsLliked] = useState<boolean>(false);
  const [fetch,setFetch] = useState<boolean>(false);

  const toast = useToast();

  const fetchAllPosts = async () => {

    const { data } = await axios.get("http://localhost:4000/api/allPost", {
      headers: {
        "x-auth-token": token,
      },
    });

    if (data) {
    
      setAllPosts(data.reverse());
    }
  };

  useEffect(() => {
    fetchAllPosts();
    return ()=>setFetch(false)
  }, [fetch]);

  
  async function handleComment(text: string, postId: string) {
 setFetch(true);
    if (text) {
      const { data } = await axios.put(
        "http://localhost:4000/api/comment",
        { text, postId },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return data;
    }
  }

  async function uploadPost(url: string, caption: string) {
    setFetch(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/post",
        { caption, photo: url },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (data) {
        setAllPosts([...allPosts, data]);
        onClose();
        toast({
          title: "Upload Successfull 🚀🚀",
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function likePost(post: Post) {
    const posts = [...allPosts];
    const index = posts.indexOf(post);
    posts[index] = { ...posts[index] };
    posts[index].liked = !posts[index].liked;
    setAllPosts(posts);
  }

  function unLike(postId: string) {
    setFetch(true)
    axios
      .put(
        "http://localhost:4000/api/unLike",
        { postId },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsLliked(false);
        }
      });
  }
  function Like(postId: string) {
    setFetch(true)
    axios
      .put(
        "http://localhost:4000/api/like",
        { postId },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsLliked(true);
        }
      });
  }

  function handleLike(post: Post, postId: string) {
    likePost(post);
    if (!isLiked) {
      Like(postId);
    } else if (isLiked) {
      unLike(postId);
    }
  }

  return (
    <>
      <Navbar />

      <Box padding=".5em 1em">
        <Box
          className="gContainer"
          position="relative"
          // sx={{gridTemplateColumns:'1fr 2fr'}}

          m="auto"
          gridColumnGap="42px"
        >
          <AboutContainer />
          <Box className="grid2">
            <Box bg="white" padding="1.4em" borderRadius="5px">
              <Box marginBottom="22px" display="flex" alignItems="center">
                <Avatar
                  size="sm"
                  name="kaushik"
                  src={user.user.pic}
                  marginRight="12px"
                />
                <Input width="100%" placeholder="What's on your mind?" />
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  onClick={onOpen}
                  marginRight="12px"
                  size="sm"
                  bg="#EDEDED"
                  display="flex"
                  alignItems="center"
                >
                  <FaImage color="#4DED4A" style={{ marginRight: "7px" }} />
                  Photo
                </Button>
                <Button marginRight="12px" size="sm" bg="#EDEDED">
                  <BsFillCameraVideoFill
                    style={{ marginRight: "7px" }}
                    color="#A00EE4"
                  />
                  Video
                </Button>
                <Button marginRight="12px" size="sm" bg="#EDEDED">
                  <BsFillEmojiSmileFill
                    style={{ marginRight: "7px" }}
                    color="#CA0DE9"
                  />
                  Feeling/Activity
                </Button>
              </Box>
            </Box>

            {allPosts.map((posts) => (
              <Card
                id={posts._id}
                caption={posts.caption}
                photo={posts.photo}
                key={posts._id}
                comments={posts.comments.slice(0, 3)}
                liked={posts.liked}
                post={posts}
                likes={posts.likes.length}
                handleComment={handleComment}
                time={posts.createdAt}
                handleLike={handleLike}
              />
            ))}
          </Box>
          <UserContainer />
        </Box>
      </Box>
      <PostModal isOpen={isOpen} onClose={onClose} uploadPost={uploadPost} />
    </>
  );
}

export default Dashboard;
