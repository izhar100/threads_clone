import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuSendHorizonal } from 'react-icons/lu';
import { api } from '../api';
import { useRecoilValue } from 'recoil';
import { selectedConversationAtom } from '../atoms/messagesAtom';
import useShowToast from '../hooks/useShowToast';
import { useSocket } from '../context/SocketContext';
const MessageInput = ({setMessages}) => {
  const [messageText,setMessageText]=useState("")
  const selecetedConversation=useRecoilValue(selectedConversationAtom)
  const showToast=useShowToast()

  const handleSendMessage=async(e)=>{
    e.preventDefault()
    if(!messageText) return;
    try {
      const res= await fetch(`${api}/messages`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body:JSON.stringify({
          message:messageText,
          recipientId:selecetedConversation.userId
        })
      })
      const data=await res.json()
      if(data.error){
        return showToast("Error",data.error,"error")
      }
      setMessages((message)=>[...message,data])
      setMessageText("")
    } catch (error) {
      showToast("Error",error.message,"error")
    }
  }
  return (
    <>
      <form onSubmit={handleSendMessage}>
        <InputGroup>
         <Input w={"full"} placeholder='Type a message...'
         onChange={(e)=>setMessageText(e.target.value)}
         value={messageText}
         />
         <InputRightElement>
          <LuSendHorizonal size={20} onClick={handleSendMessage} cursor={"pointer"}/>
         </InputRightElement>
        </InputGroup>
      </form>
    </>
  )
}

export default MessageInput
