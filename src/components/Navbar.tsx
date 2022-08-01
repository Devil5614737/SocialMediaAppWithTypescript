
import { Avatar, Box, Divider, Input, useDisclosure} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {GrLogout} from 'react-icons/gr';
import {CgProfile} from 'react-icons/cg';
import {MdDarkMode} from 'react-icons/md';
import { UserDrawer } from "./UserDrawer";




export const Navbar = () => {
const navigate=useNavigate();
const { isOpen, onOpen, onClose } = useDisclosure()

const handleLogout=()=>{
  // localStorage.removeItem('currentUser')
navigate('/');
}

const handleDarkTheme=()=>{

}

  return (
    <Box className="nav " zIndex='999' bg='white' position='sticky' top='0px' padding=".5em 1em">
      <Box
        maxWidth="1100px"
        m="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Box display='flex' alignItems='center'>
          <Link to='/dashboard'>
          <Box className="logo"  height='38px' mr='12px' display='grid' placeItems='center' padding='0em .5em' bg='#0072FF' borderRadius='5px' cursor='pointer'>
      <svg fill='white' height='20px' width='20px' viewBox="0 0 448 512"><path d="M447.8 153.6c-2 43.6-32.4 103.3-91.4 179.1-60.9 79.2-112.4 118.8-154.6 118.8-26.1 0-48.2-24.1-66.3-72.3C100.3 250 85.3 174.3 56.2 174.3c-3.4 0-15.1 7.1-35.2 21.1L0 168.2c51.6-45.3 100.9-95.7 131.8-98.5 34.9-3.4 56.3 20.5 64.4 71.5 28.7 181.5 41.4 208.9 93.6 126.7 18.7-29.6 28.8-52.1 30.2-67.6 4.8-45.9-35.8-42.8-63.3-31 22-72.1 64.1-107.1 126.2-105.1 45.8 1.2 67.5 31.1 64.9 89.4z"/></svg>
           </Box>
          </Link>
            <Input onKeyDown={onOpen}  onClick={onOpen} placeholder="search users..." />
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Link to='/dashboard'>
          <Box marginRight='26px' padding=".9em" cursor="pointer" bg="#ECECEC" borderRadius="5px">
            <FaHome />
          </Box>
          </Link>
          <Box marginRight='26px' padding=".9em" cursor="pointer" bg="#ECECEC" borderRadius="5px">
            <FaBell />
          </Box>
          <Box onClick={handleDarkTheme} marginRight='26px' padding=".9em" cursor="pointer" bg="#ECECEC" borderRadius="5px">
          <MdDarkMode/>
          </Box>
          <Menu>
            <MenuButton
              padding=".7em"
              cursor="pointer"
              bg="#ECECEC"
              borderRadius="5px"
            >
              <Avatar size="xs" name="Kola Tioluwani" src="" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=>navigate('/profile')}>
              <CgProfile style={{marginRight:'5px'}}/>
              Profile</MenuItem>
              <Divider/>
              
              <Divider/>
              <MenuItem onClick={handleLogout}>
                <GrLogout style={{marginRight:'5px'}}/>
                Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <UserDrawer isOpen={isOpen} onClose={onClose}/>
    </Box>
  );
};
