import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useShowToast from './useShowToast'
import { api } from '../api'

const getUserProfile = () => {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const {username}=useParams()
  const showToast=useShowToast()
  useEffect(()=>{
    const getUser=async()=>{
        try {
          const res=await fetch(`${api}/users/profile/${username}`,{
            headers:{
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
          })
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

  return {user,loading}
}

export default getUserProfile
