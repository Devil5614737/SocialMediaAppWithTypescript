import { Box } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { LoginComp } from '../components/LoginComp';
import { SignupComp } from '../components/SignupComp';


export const Login=()=>{


    return (
        <main className="loginMain">
           <Box bg='white' borderRadius='6px' width='400px' height='400px' boxShadow='4px 5px 32px 1px rgba(0, 0, 0, 0.25)'>
           <Box p='1em'>
           <Tabs>
  <TabList display='flex' justifyContent='center'>
    <Tab>Login</Tab>
    <Tab>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>

<LoginComp/>
    </TabPanel>
    <TabPanel>
      <SignupComp/>
    </TabPanel>
    
  </TabPanels>
</Tabs>
           </Box>
           </Box>
        </main>
    )
}