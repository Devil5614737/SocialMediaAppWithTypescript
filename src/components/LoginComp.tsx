import { FormControl,FormLabel,Input ,Button, Spinner} from "@chakra-ui/react"
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IAuthContext } from "../interfaces/IAuthContext";

export const LoginComp=()=>{
  const {login,loading}=useContext<IAuthContext>(AuthContext)
const[email,setEmail]=useState<string>('')
const[password,setPassword]=useState<string>('')


    return (
        <FormControl>
        <FormLabel htmlFor="email" >Email</FormLabel>
        <Input autoFocus type='email' id='email'  marginBottom='12px' onChange={(e:React.FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} value={email}/>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' type='password' marginBottom='12px' onChange={(e:React.FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} value={password}/>
        <Button  onClick={()=>login(email,password)} width='100%' marginTop='12px'
        bg='#0072FF' colorScheme='blue'>{loading?<Spinner />:'Login'
        }</Button>
      </FormControl>
    )
}