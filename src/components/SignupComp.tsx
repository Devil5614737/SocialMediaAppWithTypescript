import { FormControl,FormLabel,Input ,Button, Spinner} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { IAuthContext } from "../interfaces/IAuthContext"


export const SignupComp=()=>{
  const {signup,loading}=useContext<IAuthContext>(AuthContext)
const[username,setUsername]=useState<string>('')
const[email,setEmail]=useState<string>('')
const[password,setPassword]=useState<string>('');


    return (
        <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input autoFocus type='text' id='username' marginBottom='12px' onChange={(e:React.FormEvent<HTMLInputElement>)=>setUsername(e.currentTarget.value)} value={username}/>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type='email' id='email'  marginBottom='12px' onChange={(e:React.FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} value={email}/>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' type='password' marginBottom='12px' onChange={(e:React.FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} value={password}/>
        <Button onClick={()=>signup(username,email,password)}  width='100%' marginTop='12px'
        bg='#0072FF' colorScheme='blue'>{loading?<Spinner/>:'Signup'}</Button>
      </FormControl>
    )
}