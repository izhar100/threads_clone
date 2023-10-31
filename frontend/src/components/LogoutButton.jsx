import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom)
    const showToast=useShowToast()
    const navigate=useNavigate()
    const handleLogout=async()=>{
        try {
            const res=await fetch('/api/users/logout',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                }
            })
            const data=await res;
            console.log(data)
            if(data.error){
                showToast("error",data.error,"error")
                return;
            }
            localStorage.removeItem("user-threads");
            setUser(null)
            navigate("/auth")
            
        } catch (error) {
            console.log(error)
            showToast("error",error,"error")
        }
    }
  return (
    <>
        <FiLogOut cursor={"pointer"} onClick={handleLogout} size={22}/>
    </>
  )
}

export default LogoutButton
