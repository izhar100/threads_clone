import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useColorMode, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import useShowToast from '../hooks/useShowToast'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { api } from '../api'

const UserHeader = ({user}) => {
    const {colorMode}=useColorMode()
    const showToast=useShowToast()
    const currentUser=useRecoilValue(userAtom) //logged in user
    const navigate=useNavigate()
    const [following,setFollowing]=useState(user?.followers.includes(currentUser?._id))
    const [updating,setUpdating]=useState(false)
    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            showToast("Success",'URL copied',"success")
        })
    }

    const handleFollowUnfollow=async()=>{
        if(!currentUser){
            showToast("Error",'Please login to follow',"error")
            return;
        }
        if(updating) return;
        setUpdating(true)
        try {
            const res = await fetch(`${api}/users/follow/${user?._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            const data=await res.json()
            if(data.error){
                showToast("Error",error,"error")
                return;
            }
            if(following){
                showToast("Success",`Unfollowed ${user?.name}`,"success")
                user?.followers.pop()
            }else{
                showToast("Success",`Followed ${user?.name}`,"success")
                user?.followers.push(currentUser?._id)
            }
            setFollowing(!following)
        } catch (error) {
            showToast("Error",error,"error") 
        } finally{
            setUpdating(false)
        }
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Flex alignItems={"center"}><Text fontSize={"2xl"} fontWeight={"bold"}>{user?.name}</Text>
                    <Image display={user?.username=="ezhar"?"inline":"none"} src='/verified.png' w={4} h={4} ml={2} />
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>@{user?.username}</Text>
                        <Text fontSize={"xs"} bg={colorMode=="dark"?"gray.dark":"#a67d7d"} color={"gray.light"} p={1} borderRadius={'full'}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name={user?.name} src={user?.profilePic} size={{
                        base:"md",
                        md:"xl"
                    }} />
                </Box>
            </Flex>
            <Text>{user?.bio}</Text>
            {
                currentUser?._id==user?._id ? (
                    <Button border={"1px solid #c4c4c4"} size={"sm"} onClick={()=>navigate("/update")}>Update Profile</Button>
                )
                :
                <Button border={"1px solid #c4c4c4"} size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>{following?"Unfollow":"Follow"}</Button>
            }
            <Flex w={'full'} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user?.followers.length} followers</Text>
                    <Box w={1} h={1} borderRadius={'full'} bg={'gray.light'}></Box>
                    <Link color='gray.light'>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={'pointer'} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} color={"white"}
                                        onClick={copyURL}
                                    >Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
            <Flex w={'full'}>
             <Flex flex={1} borderBottom={colorMode=="dark"?"1.5px solid white":"1.5px solid black"} justifyContent={"center"} 
             pb={3} cursor={'pointer'} fontWeight={'bold'}>
                <Text>Threads</Text>
             </Flex>
             <Flex flex={1} borderBottom={"1px solid gray"} color={'gray.light'} justifyContent={"center"} 
             pb={3} cursor={'pointer'} fontWeight={'bold'}>
                <Text>Replies</Text>
             </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader
