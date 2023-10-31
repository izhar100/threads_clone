import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'

const Post = ({ post:post_, postedBy }) => {
    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState(null)
    const [post,setPost]=useState(post_)
    const showToast = useShowToast()
    const navigate=useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`api/users/profile/${postedBy}`)
                const data = await res.json()
                if (data.error) {
                    showToast("Error", data.error, "error")
                }
                setUser(data)
            } catch (error) {
                showToast("Error", error.message, "error")
                setUser(null)
            }
        }
        getUser()
    }, [showToast, postedBy])
    // if (!user) return null
    const handleReplyInPost=(reply)=>{
        setPost({...post,replies:[...post.replies,reply]})     
    }
    return (
        <>
            <Link to={"/markzukerberg/post/1"}>
                <Flex gap={3} mb={4} py={5}>
                    <Flex flexDirection={'column'} alignItems={"center"}>
                        <Avatar size={'md'} name={user?.name} src={user?.profilePic}
                         onClick={(e)=>{
                            e.preventDefault();
                            navigate(`/${user.username}`)
                         }}
                         />
                        <Box display={post.replies.length > 0 ? "block" : "none"} h={'full'} w={'1px'} bg={'gray.light'} my={2}></Box>
                        <Box display={post.replies.length > 0 ? "block" : "none"} position={'relative'} w={'full'}>
                            {post.replies[0] && (
                               <Avatar
                               size={'xs'}
                               name={post.replies[0].username}
                               src={post.replies[0].userProfilePic}
                               position={'absolute'}
                               top={'0px'}
                               left={'15px'}
                               padding={"2px"}
                               />
                            )}
                            {post.replies[1] && (
                                <Avatar
                                size={'xs'}
                                name={post.replies[1].username}
                                src={post.replies[1].userProfilePic}
                                position={'absolute'}
                                bottom={'0px'}
                                right={'-5px'}
                                padding={"2px"}
                                />
                            )}
                            {post.replies[2] && (
                                <Avatar
                                size={'xs'}
                                name={post.replies[2].username}
                                src={post.replies[2].userProfilePic}
                                position={'absolute'}
                                bottom={'0px'}
                                left={'4px'}
                                padding={"2px"}
                                />
                            )}
                        </Box>
                    </Flex>
                    <Flex flex={1} flexDirection={'column'} gap={2}>
                        <Flex justifyContent={'space-between'} w={'full'}>
                            <Flex alignItems={"center"} w={"full"}>
                                <Text fontSize={'sm'} fontWeight={"bold"}
                                 onClick={(e)=>{
                                    e.preventDefault();
                                    navigate(`/${user.username}`)
                                 }}
                                >{user?.name}</Text>
                                <Image src='/verified.png' w={4} h={4} ml={1} />
                            </Flex>
                            <Flex gap={4} alignItems={'center'} >
                                <Text w={36} textAlign={"right"} fontSize={'xs'} color={'gray.light'}>{formatDistanceToNow(new Date(post?.createdAt))} ago</Text>
                                <BsThreeDots />
                            </Flex>
                        </Flex>
                        <Text fontSize={"sm"}>{post.text}</Text>
                        {
                            post.img && <Box borderRadius={6} overflow={'hidden'} border={"1px solid"} borderColor={"gray.light"}>
                                <Image src={post.img} w={"full"} />
                            </Box>
                        }
                        <Flex gap={3} my={1}>
                            <Actions post={post} handleReplyInPost={handleReplyInPost} />
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <Box w={'full'} h={'0.5px'} bg={'gray.light'} my={2}></Box>
        </>
    )
}

export default Post