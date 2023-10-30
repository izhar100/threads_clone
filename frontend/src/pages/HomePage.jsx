import { Button, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import Post from '../components/Post'

const HomePage = () => {
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(true)
  const showToast=useShowToast()
  useEffect(()=>{
    const getFeedPost=async()=>{
      setLoading(true)
      try {
        const res=await fetch(`api/posts/feed`)
        const data=await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        setPosts(data)
        console.log(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      }finally{
        setLoading(false)
      }
    }
    getFeedPost()
  },[showToast])
  return (
    <>
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
