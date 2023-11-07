import { Avatar, Box, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtom'
import useShowToast from '../hooks/useShowToast'
import { api } from '../api'
import userAtom from '../atoms/userAtom'
import { useSocket } from '../context/SocketContext'

const MessageContainer = () => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const currentUser=useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading,setLoading]=useState(false)
  const [messages,setMessages]=useState([])
  const {socket}=useSocket()
  const messageEndRef=useRef(null)

  useEffect(() => {
    const getMessage = async () => {
      if(selectedConversation.mock) return;
      setLoading(true)
      setMessages([])
      try {
        const res = await fetch(`${api}/messages/${selectedConversation.userId}`,{
          method:'GET',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data=await res.json()
        if(data.error){
          return showToast("Error",data.error,"error")
        }
        setMessages(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      }finally{
        setLoading(false)
      }
    }
    getMessage()
  }, [showToast])

  useEffect(()=>{
    socket?.on("newMessage",(message)=>{
      if(selectedConversation?._id==message.conversationId){
        setMessages((preMessages)=>[...preMessages,message])
      }
    })
    return ()=>socket?.off("newMessage")
  },[socket])

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  return (
    <>
      <Flex flex={"70"} bg={useColorModeValue("gray.200", "gray.dark")}
        borderRadius={"md"} flexDirection={"column"}
      >
        {/* Message header */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2} p={2}>
          <Avatar src={selectedConversation?.userProfilePic} size={"sm"} name={selectedConversation?.name} />
          <Text display={"flex"} alignItems={"center"} fontWeight={"500"}>
            {selectedConversation?.name} <Image display={selectedConversation?.username == "ezhar" ? "inline" : "none"} src='/verified.png' w={4} h={4} ml={1} />
          </Text>
        </Flex>
        <Box w={"full"} borderBottom="1px solid gray"></Box>
        <Flex flexDir={"column"} gap={4} my={4}
          height={"68vh"} overflowY={"auto"}
        >
          {
            loading && (
              [...Array(9)].map((_, i) => (
                <Flex key={i} gap={2} alignItems={"center"} p={1}
                  borderRadius={"md"} alignSelf={i % 2 == 0 ? "flex-start" : "flex-end"}
                >
                  {i % 2 == 0 && <SkeletonCircle size={7} />}
                  <Flex flexDir={"column"} gap={2}>
                    <Skeleton h={"8px"} w={"200px"} />
                    <Skeleton h={"8px"} w={"200px"} />
                  </Flex>
                  {i % 2 !== 0 && <SkeletonCircle size={7} />}
                </Flex>
              ))
            )
          }
          {
            !loading && messages?.length>0 && (
              messages.map((message)=>(
                <Flex key={message._id} flexDirection={"column"}
                ref={messages.length-1 === messages.indexOf(message)?messageEndRef:null}
                >
                  <Message key={message._id} message={message} ownMessage={message.sender==currentUser._id} />
                </Flex>
              ))
            )
          }
        </Flex>
        <MessageInput setMessages={setMessages} />
      </Flex>
    </>
  )
}

export default MessageContainer
