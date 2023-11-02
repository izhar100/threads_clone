import { Avatar, Box, Button, Divider, Flex, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({user,lastUser}) => {
    const navigate=useNavigate()
    return (
        <>
            <Box onClick={()=>navigate(`/${user.username}`)} cursor={"pointer"} borderBottom={user._id!==lastUser._id && "1px solid #bbbbbb"} py={5}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Flex w={'full'} alignItems={'center'} gap={3}>
                        <Avatar src={user.profilePic} size={'md'} name={user.name} />
                        <Flex>
                            <Box>
                                <Text fontSize={'sm'} fontWeight={'bold'}>{user.name}</Text>
                                <Text mt={"-2px"} fontSize={'xs'} color={"gray.light"}>@{user.username}</Text>
                                <Text mt={"-2px"} fontSize={'xs'} color={"gray.light"}>{user.followers.length} followers</Text>
                            </Box>
                            <Image display={user.username=="ezhar"?"inline":"none"} src='/verified.png' w={4} h={4} ml={2} mt={1} />
                        </Flex>
                    </Flex>
                    <Button border={"1px solid #c4c4c4"} px={5} size={"sm"}>View Profile</Button>
                </Flex>
            </Box>
        </>
    )
}

export default UserCard
