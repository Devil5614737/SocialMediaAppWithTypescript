import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { IAuthContext, User } from "../interfaces/IAuthContext";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as IAuthContext);

interface AuthContextProps {
  children: ReactNode;
}


const token = JSON.parse(localStorage.getItem("currentUser") || "").token;

function AuthContextProvider({ children }: AuthContextProps) {
  const navigate=useNavigate()
  const [auth] = useState<boolean>(false);
  const[loading,setLoading]=useState<boolean>(false)
  const[users,setUsers]=useState<User[]>([]);
  const[searchResults,setSearchResults]=useState<User[]>([]);

  const toast = useToast();


  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://socialmediatypescript.herokuapp.com/api/login", {
        email,
        password,
      });
     if(data){
      setLoading(false)
       localStorage.setItem('currentUser',JSON.stringify(data));
      navigate('/dashboard');

     }
    } catch (error:any) {
      setLoading(false)
      toast({
        title:error.response.data,
        position: 'top-right',
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
     
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true)
    try {
      const { data } = await axios.post("https://socialmediatypescript.herokuapp.com/api/signup", {
        username,
        email,
        password,
      });
      if(data){
         toast({
        title:"user created ",
        position: 'top-right',
        status: 'success',
        duration: 1500,
        isClosable: true,
      })
        setLoading(false)
      };
    } catch (error:any) {
      setLoading(false)
      toast({
        title:error.response.data,
        position: 'top-right',
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
    }
  };


const user=JSON.parse(localStorage.getItem('currentUser')||'');


const fetchUsers=()=>{
axios.get('https://socialmediatypescript.herokuapp.com/api/users',{
  headers:{
    'x-auth-token':token
  }
}).then(res=>setUsers(res.data)).catch(e=>console.log(e))
}




useEffect(()=>{
fetchUsers();
},[])


const searchUsers=(query:string)=>{
  axios.get(`https://socialmediatypescript.herokuapp.com/api/?search=${query}`,{
    headers:{
      'x-auth-token':token
    }
  }).then(res=>setSearchResults(res.data)).catch(e=>console.log(e))
  }






const addFriend=(userId:string)=>{
  axios.put('https://socialmediatypescript.herokuapp.com/api/addFriend',{userId},{
    headers:{
      'x-auth-token':token
    }
  }).then(res=>console.log(res.data)).catch(e=>console.log(e))
}



  return (
    <AuthContext.Provider value={{addFriend,searchResults,searchUsers,users,user, auth, login, signup,loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
