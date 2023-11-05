import { Box, Button, Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate } from 'react-router-dom'
import authScreenAtom from '../atoms/authAtom'
import CreatePost from './CreatePost'
import { CgMenuRight } from 'react-icons/cg'
import { LiaFacebookMessenger } from "react-icons/lia";
import LogoutButton from './LogoutButton'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)
  const location=useLocation()
  const [auth, setAuth] = useRecoilState(authScreenAtom)
  return (
    <Box position={"fixed"} w={"100%"} p={3} zIndex={2} bgColor={colorMode == "light" ? "#edf2f7d7" : "#101010db"}>
      <Flex maxW={"900px"} m={"auto"} justifyContent={"space-between"}>
        {
          user && (
            <Image
              cursor={'pointer'}
              w={6}
              alt='logo'
              src={colorMode == "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
              onClick={toggleColorMode}
            />
          )
        }
        {
          user ?
            <AiOutlineHome size={24} style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
            :
            <Button onClick={() => {
              setAuth("login")
              navigate("/auth")
            }}>Login</Button>
        }
        {
          !user && (
            <Image
              cursor={'pointer'}
              w={6}
              alt='logo'
              src={colorMode == "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
              onClick={toggleColorMode}
            />
          )
        }
        {
          user && (
            <LuSearch onClick={()=>navigate("/search")} size={24} cursor={"pointer"} />
          )
        }
        {
          user && !location.pathname.includes("conversation") && (
            <CreatePost />
          )
        }
        {
          user && (
            <LiaFacebookMessenger cursor={"pointer"} size={24} onClick={()=>navigate("/conversation")}/>
          )
        }
        {
          user ?
            <RxAvatar size={24} style={{ cursor: "pointer" }} onClick={() => navigate(`/${user?.username}`)} />
            :
            <Button onClick={() => {
              setAuth("signup")
              navigate("/auth")
            }}>Sign Up</Button>
        }
        {
          user && (
            // <CgMenuRight size={24} />
            <LogoutButton/>
          )
        }
      </Flex>
    </Box>
  )
}

export default Header
