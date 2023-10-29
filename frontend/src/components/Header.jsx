import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import {AiFillHome} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const {colorMode,toggleColorMode}=useColorMode()
    const navigate=useNavigate()
    const user=useRecoilValue(userAtom)
  return (
    <>
    <Flex justifyContent={user?"space-between":"center"} mt={6} mb={12}>
      {
        user && (
          <AiFillHome size={24} style={{cursor:"pointer"}} onClick={()=>navigate("/")}/>
        )
      }
       <Image
       cursor={'pointer'}
       w={6}
       alt='logo'
       src={colorMode=="dark"? "/light-logo.svg":"/dark-logo.svg"}
       onClick={toggleColorMode}
       />
       {
        user && (
          <RxAvatar size={24} style={{cursor:"pointer"}} onClick={()=>navigate(`/${user.username}`)}/>
        )
       }
    </Flex>
    </>
  )
}

export default Header
