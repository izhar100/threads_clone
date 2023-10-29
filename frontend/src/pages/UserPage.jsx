import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

const UserPage = () => {
  const [user,setUser]=useState(null)
  const showToast=useShowToast()
  const {username}=useParams()
  const [loading,setLoading]=useState(true)

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
      <UserPost postImg='/post1.png' likes={234} replies={57} postTitle="Hi let's start using thread."/>
      <UserPost postImg='/post2.png' likes={234} replies={57} postTitle="This is a nice tutorial"/>
      <UserPost postImg='/post3.png' likes={234} replies={57} postTitle="How are you all today?"/>
      <UserPost likes={234} replies={57} postTitle="Testing thread without photo."/>
    </>
  )
}

export default UserPage
