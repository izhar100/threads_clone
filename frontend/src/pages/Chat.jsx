import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, InputGroup, InputLeftElement, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React, { useState } from 'react'
import Conversation from '../components/Conversation'
import NoChats from '../components/NoChats'

const Chat = () => {
    const [input,setInput]=useState()
    return (
        <>
            <InputGroup border={"2px solid gray.dark"} borderRadius={"10px"} boxShadow={"rgba(0, 80, 123, 0.093) 0px 4px 12px"}>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input onChange={(e) => setInput(e.target.value)} type='text' placeholder='Search' />
            </InputGroup>
            <br />
            {
                true && (
                    [0,1,2,3,4].map((el,i)=>(
                        <Flex key={el} mt={5} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                           <Box>
                            <SkeletonCircle size={"10"}/>
                           </Box>
                           <Flex w={"full"} flexDirection={"column"} gap={2}>
                            <Skeleton h={"15px"} w={"30%"}/>
                            <Skeleton h={"10px"} w={"100%"}/>

                           </Flex>
                        </Flex>
                    ))
                )
            }
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <NoChats/>
        </>
    )
}

export default Chat
