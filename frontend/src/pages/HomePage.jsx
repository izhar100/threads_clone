import { Avatar, Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import Post from '../components/Post'
import { useRecoilState, useRecoilValue } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'
import CreatePost from '../components/CreatePost'
import userAtom from '../atoms/userAtom'
import { LuPencilLine } from "react-icons/lu";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModel] = useState(false)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [page, setPage] = useState(1)
  const [allDone, setAllDone] = useState(false)
  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true)
      if (page == 1) {
        setPosts([])
      }
      try {
        const res = await fetch(`${api}/posts/feed?page=${page}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data = await res.json()
        if (data.error) {
          showToast("Error", data.error, "error")
          return;
        }
        // setPosts(data)
        console.log("data:", data)
        if (data.length == 0 && posts.length > 0) {
          setAllDone(true)
        }
        setPosts((preData) => [...preData, ...data])
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPost()
  }, [showToast, setPosts, page])

  const handleLoadMore = () => {
    setPage(pre => pre + 1)
  }

  return (
    <>
    <Button borderRadius={50} position={"fixed"} bottom={4} right={4}  onClick={()=>{
          if(!openModal){
            setOpenModel(true)
          }
        }}
      boxShadow={ "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} px={"-2px"} bgColor={"#a0a0a066"} color={"bg.dark"}>
      <LuPencilLine cursor={"pointer"} size={20}
      />
      </Button>
      <Flex alignItems={"center"} mb={3} pb={2} gap={2} borderBottom={"1px solid #bdbdbd"}>
        <Avatar src={user?.profilePic} name={user?.username} />
        {/* <Input disabled placeholder='Start a thread...' onClick={()=>setOpenModel(true)}/> */}
        <Box w={"full"} cursor={"pointer"}>
          <Text color={"#7d7d7d"} fontWeight={"500"} onClick={() => setOpenModel(true)} mt={"10px"}>Izhar-e-thought...</Text>
        </Box>
        <Button onClick={()=>{
          if(!openModal){
            setOpenModel(true)
          }
        }} px={"-2px"} bgColor={"#a0a0a066"} color={"bg.dark"}><LuPencilLine size={"20px"}/></Button>
      </Flex>
      <Box display={"none"}>
        <CreatePost openModal={openModal} setOpenModel={setOpenModel} />
      </Box>
      {!loading && posts.length == 0 && <Heading textAlign={"center"}>Follow some user to see the feed</Heading>}
      {
        loading && (
          <Loader />
        )
      }
      {
        posts?.map((post, ind) => (
          <Post key={post._id + ind} post={post} postedBy={post.postedBy} index={ind + 1} lastPost={posts.length} />
        ))
      }
      {
        posts.length > 0 && (
          <Box>
            <hr />
            <Flex my={2} justifyContent={"center"}>{
              allDone ? "Feed Exhausted, Explorer!" : <Button colorScheme='blue' onClick={handleLoadMore} isLoading={loading}>Load More</Button>
            }</Flex>
          </Box>
        )
      }
    </>
  )
}

export default HomePage
