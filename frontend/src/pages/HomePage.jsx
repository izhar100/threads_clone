import { Avatar, Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import Post from '../components/Post'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'
import CreatePost from '../components/CreatePost'

const HomePage = () => {
  const [posts,setPosts]=useRecoilState(postsAtom)
  const [loading,setLoading]=useState(true)
  const [openModal,setOpenModel]=useState(false)
  const showToast=useShowToast()
  useEffect(()=>{
    const getFeedPost=async()=>{
      setLoading(true)
      setPosts([])
      try {
        const res=await fetch(`${api}/posts/feed`,{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data=await res.json()
        console.log(data)
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      }finally{
        setLoading(false)
      }
    }
    getFeedPost()
  },[showToast,setPosts])
  
  return (
    <>
    <Flex alignItems={"center"} mb={3} pb={2} gap={2} borderBottom={"1px solid #bdbdbd"}>
      <Avatar src='' name='Ezhar Ashraf'/>
      {/* <Input disabled placeholder='Start a thread...' onClick={()=>setOpenModel(true)}/> */}
      <Box w={"full"}>
        <Text color={"#7d7d7d"} fontWeight={"500"} onClick={()=>setOpenModel(true)} mt={"10px"}>Start a thread...</Text>
      </Box>
      <Button color={"white"} bgColor={"gray.light"}>POST</Button>
    </Flex>
    <Box display={"none"}>
    <CreatePost openModal={openModal} setOpenModel={setOpenModel}/>
    </Box>
    {!loading && posts.length==0 && <Heading textAlign={"center"}>Follow some user to see the feed</Heading>}
      {
        loading && (
          <Loader/>
        )
      }
      {
        posts?.map((post)=>(
          <Post key={post._id} post={post} postedBy={post.postedBy}/>
        ))
      }
    </>
  )
}

export default HomePage
