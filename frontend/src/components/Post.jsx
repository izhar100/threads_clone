import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { DeleteIcon } from '@chakra-ui/icons'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'

const Post = ({ post, postedBy }) => {
    const [user, setUser] = useState(null)
    const showToast = useShowToast()
    const navigate=useNavigate()
    const [posts,setPosts]=useRecoilState(postsAtom)
    const currentUser=useRecoilValue(userAtom)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`${api}/users/profile/${postedBy}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    }
                })
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
    }, [showToast, postedBy,setUser])
    // if (!user) return null
    const handleDeletePost=async(e)=>{
        e.preventDefault()
        try {
            if(!window.confirm("Are you sure you want to delete this post?")) return;
            const res=await fetch(`${api}/posts/${post._id}`,{
                method:'DELETE',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            const data=await res.json()
            if(data.error){
                return showToast("Error",data.error,"error")
            }
            showToast("Success","Post deleted","success")
            setPosts(posts.filter((el)=>el._id!==post._id))
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return (
        <>
            <Link to={`/${user?.username}/post/${post?._id}`}>
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
                        <Flex justifyContent={"space-between"} w={"100%"} >
                            <Flex alignItems={"center"} w={"45%"} >
                                <Text fontSize={'sm'} fontWeight={"bold"}
                                 onClick={(e)=>{
                                    e.preventDefault();
                                    navigate(`/${user?.username}`)
                                 }}
                                >{user?.name}</Text>
                                <Image display={user?.username=="ezhar"?"inline":"none"} src='/verified.png' w={4} h={4} ml={1} />
                            </Flex>
                            <Flex w={"55%"} gap={4} alignItems={'center'} >
                                <Text w={36} textAlign={"right"} fontSize={'xs'} color={'gray.light'}>{formatDistanceToNow(new Date(post?.createdAt))} ago</Text>
                                {currentUser?._id==user?._id && <DeleteIcon onClick={handleDeletePost}/>}
                            </Flex>
                        </Flex>
                        <Text fontSize={"sm"}>{post.text}</Text>
                        {
                            post.img && <Box borderRadius={6} overflow={'hidden'} border={"1px solid"} borderColor={"gray.light"}>
                                <Image src={post.img} w={"full"} />
                            </Box>
                        }
                        <Flex gap={3} my={1}>
                            <Actions post={post}/>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <Box w={'full'} h={'0.5px'} bg={'gray.light'} my={2}></Box>
        </>
    )
}

export default Post
