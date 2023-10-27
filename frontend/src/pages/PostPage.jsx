import { Avatar, Box, Button, Divider, Flex, Image, Text, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'

const PostPage = () => {
    const [liked, setLiked] = useState(false)
    const {colorMode}=useColorMode()
    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar src='/zuck-avatar.png' size={'md'} name='mark-zuckerberg' />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>markzuckerberg</Text>
                        <Image src='/verified.png' w={4} h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'} >
                    <Text fontStyle={'sm'} color={'gray.light'}>1d</Text>
                    <BsThreeDots />
                </Flex>
            </Flex>
            <Text my={3}>Hi let's start using thread!</Text>
            <Box borderRadius={6} overflow={'hidden'} border={"1px solid"} borderColor={"gray.light"}>
                <Image src="/post1.png" w={"full"} />
            </Box>
            <Flex gap={3} my={1}>
                <Actions liked={liked} setLiked={setLiked} />
            </Flex>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={'sm'} color={'gray.light'}>57 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={'full'} bg={"gray.light"}></Box>
                <Text fontSize={'sm'} color={'gray.light'}>{500 + (liked?1:0)} likes</Text>
            </Flex>
            <Divider my={4}/>
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>👋</Text>
                    <Text color={'gray.light'}>Get the app to like,reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4}/>
            <Comment 
             comment={"It's a great update!"} 
             createdAt={"2d"} 
             likes={50} 
             username={"ezharashraf"} 
             userAvatar={"https://bit.ly/dan-abramov"}
            />
            <Comment 
             comment={"It's really awesome!"} 
             createdAt={"3d"} 
             likes={56} 
             username={"mustafa"} 
             userAvatar={"https://bit.ly/kent-c-dodds"}
            />
            <Comment 
             comment={"Yah that's nice!"} 
             createdAt={"2d"} 
             likes={50} 
             username={"shamsher"} 
             userAvatar={"https://bit.ly/ryan-florence"}
            />
        </>
    )
}

export default PostPage
