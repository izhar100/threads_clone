import { Button, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import Post from '../components/Post'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'

const HomePage = () => {
  const [posts,setPosts]=useRecoilState(postsAtom)
  const [loading,setLoading]=useState(true)
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
