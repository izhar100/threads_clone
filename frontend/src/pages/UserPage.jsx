import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'
import { Heading } from '@chakra-ui/react'
import Post from '../components/Post'

const UserPage = () => {
  const [user,setUser]=useState(null)
  const showToast=useShowToast()
  const {username}=useParams()
  const [loading,setLoading]=useState(true)
  const [posts,setPosts]=useState([])
  const [fetchingPosts,setFetchingPosts]=useState(false)

  useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await fetch(`/api/users/profile/${username}`)
        const data=await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        setUser(data)
      } catch (err) {
        showToast("Error",err,"error")
      }finally{
        setLoading(false)
      }
    }

    const getPosts=async()=>{
      setFetchingPosts(true)
      try {
        const res=await fetch(`/api/posts/user/${username}`)
        const data=await res.json()
        if(data.error){
          return showToast("Error",data.error,"error")
        }
        setPosts(data)
        console.log(data)
      } catch (error) {
        showToast("Error",error,"error")
      }finally{
        setFetchingPosts(false)
      }
    }
    getPosts()

    getUser()

  },[username,showToast])

  if(!user && loading){
    return <Loader/>
  }
  if(!user && !loading){
    return <NotFound text={"User"}/>
  }
  return (
    <>
      <UserHeader user={user}/>
      {
        fetchingPosts && <Loader/>
      }
      {
        !fetchingPosts && posts?.length==0 && (
          <Heading mt={10} textAlign={"center"}>No any post found!</Heading>
        )
      }
      {
        !fetchingPosts && posts?.length>0 && (
          posts?.map((post)=>(
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))
        )
      }
    </>
  )
}

export default UserPage
