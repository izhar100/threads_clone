import { Avatar, Box, Button, Divider, Flex, Image, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import getUserProfile from '../hooks/getUserProfile'
import PostLoader from '../components/PostLoader'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'

const PostPage = () => {
    const { loading, user } = getUserProfile()
    const { colorMode } = useColorMode()
    // const [post, setPost] = useState(null)
    const [posts,setPosts]=useRecoilState(postsAtom)
    const showToast = useShowToast()
    const { pid } = useParams()
    const currentUser = useRecoilValue(userAtom)
    const navigate = useNavigate()
    const currentPost=posts[0]

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch(`${api}/posts/${pid}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    }
                })
                const data = await res.json()
                if (data.error) {
                    return showToast("Error", data.error, "error")
                }
                console.log(data)
                setPosts([data])
            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }
        getPost()
    }, [pid, showToast,setPosts])

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            const res = await fetch(`${api}/posts/${currentPost._id}`, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            const data = await res.json()
            if (data.error) {
                return showToast("Error", data.error, "error")
            }
            showToast("Success", "Post deleted", "success")
            navigate(`/${user?.username}`)
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    if (!user && loading) {
        return (
            <PostLoader />
        )
    }
    if (!currentPost) return null
    return (
        <Box>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar src={user?.profilePic} size={'md'} name={user?.name} />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>{user?.name}</Text>
                        <Image display={user?.username=="ezhar"?"inline":"none"} src='/verified.png' w={4} h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'} >
                    <Text w={36} textAlign={"right"} fontSize={'xs'} color={'gray.light'}>{formatDistanceToNow(new Date(currentPost?.createdAt))} ago</Text>
                    {currentUser?._id == user?._id && <DeleteIcon cursor={"pointer"} onClick={handleDeletePost} />}
                </Flex>
            </Flex>
            <Text my={3}>{currentPost?.text}</Text>
            <Box display={currentPost?.img ? "block" : "none"} borderRadius={6} overflow={'hidden'} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={currentPost?.img} w={"full"} />
            </Box>
            <Flex gap={3} my={1}>
                <Actions post={currentPost} postedBy={currentPost?.postedBy} />
            </Flex>
            <Divider my={4} />
            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>👋</Text>
                    <Text color={'gray.light'}>Get the app to like,reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4} />
            {
                currentPost?.replies?.map((reply) => (
                    <Comment key={reply._id}
                        reply={reply}
                    />
                ))
            }
        </Box>
    )
}

export default PostPage
