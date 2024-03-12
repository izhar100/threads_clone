import { Avatar, Box, Button, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import MessageInput from '../components/MessageInput'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtom'
import useShowToast from '../hooks/useShowToast'
import { api } from '../api'
import userAtom from '../atoms/userAtom'
import { useSocket } from '../context/SocketContext'
import { IoVideocam } from "react-icons/io5";
import ReactPlayer from 'react-player'
import { BsMicMuteFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import peer from '../service/peer'
const MessageContainer = () => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const currentUser = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const { socket, onlineUsers } = useSocket()
  const [page, setPage] = useState(1)
  const messageEndRef = useRef(null)
  const [allDone, setAllDone] = useState(false)
  const [myStream, setMyStream] = useState(null);
  const [muted,setMuted]=useState(false)
  const [playing,setPlaying]=useState(true)


  useEffect(() => {
    const getMessage = async () => {
      if (selectedConversation.mock) return;
      setLoading(true)
      if (page == 1) {
        setMessages([])
      }
      try {
        const res = await fetch(`${api}/messages/${selectedConversation.userId}?page=${page}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data = await res.json()
        if (data.error) {
          return showToast("Error", data.error, "error")
        }
        if (data.length == 0 && messages.length > 0) {
          setAllDone(true)
        }
        setMessages((pre) => [...pre, ...data])
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setLoading(false)
      }
    }
    getMessage()
  }, [showToast, page])

  //incoming call
  const handleIncomingCall=useCallback(({from,offer})=>{
    console.log("incoming call:",from,offer)
  },[])
 //end of incoming call

  useEffect(() => {
    console.log("socket:", socket, "online:", onlineUsers)
    socket?.on("newMessage", (message) => {
      console.log("message:",message)
      if (selectedConversation?._id == message.conversationId) {
        setMessages((preMessages) => [...preMessages, message])
      }
    })
    socket?.on('incoming:call',({from,offer})=>{
         console.log("incoming call:",from,offer)
    })
    return () => {
      socket?.off("newMessage")
      socket?.off('incoming:call')
    }
  }, [socket,handleIncomingCall])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleLoadMore = () => {
    setPage((pre) => pre + 1)
  }

  const handleVideo = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    const offer=await peer.getOffer();
    socket.emit("user:call",{to:socket.id,offer})
    setMyStream(stream)
  }, [socket])

  const handleClose = () => {
    // Stop the stream when closing the modal
    if (myStream) {
      myStream.getTracks().forEach(track => track.stop());
      setMyStream(null);
    }
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(mediaStream => {
      mediaStream.getTracks().forEach(track => track.stop());
    })
    .catch(error => {
      console.error('Error closing camera access:', error);
    });
  };
  return (
    <>
      <Flex flex={"70"} bg={useColorModeValue("gray.200", "gray.dark")}
        borderRadius={"md"} flexDirection={"column"}
      >
        {/* Message header */}
        <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} h={12} gap={2} p={2}>
          <Flex gap={2}>
            <Avatar src={selectedConversation?.userProfilePic} size={"sm"} name={selectedConversation?.name} />
            <Text display={"flex"} fontWeight={"500"}>
              {selectedConversation?.name} <Image display={selectedConversation?.username == "ezhar" ? "inline" : "none"} src='/verified.png' w={4} h={4} ml={1} />
            </Text>
          </Flex>
          <Flex>
            <IoVideocam onClick={handleVideo} size={"25px"} cursor={"pointer"} />
          </Flex>
        </Flex>
        <Text mt={-5} ml={12} fontSize={"12px"} color={onlineUsers?.includes(selectedConversation.userId) ? "green.500" : "gray.500"}>{onlineUsers?.includes(selectedConversation.userId) ? "online" : "offline"}</Text>
        <Box w={"full"} borderBottom="1px solid gray"></Box>
        <Flex flexDir={"column"} gap={4} my={4}
          height={"68vh"} overflowY={"auto"}
        >
          <Flex justifyContent={"center"}>{
            allDone
              ?
              "No more messages found!"
              :
              <Button variant={"outline"} colorScheme='blue' size={"sm"} isLoading={loading} onClick={handleLoadMore}>Load Previous Messages</Button>
          }</Flex>
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
            !loading && messages?.length > 0 && (
              messages.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
              }).map((message, ind) => (
                <Flex key={message._id + ind} flexDirection={"column"}
                  ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
                >
                  <Message key={message._id} message={message} ownMessage={message.sender == currentUser._id} />
                </Flex>
              ))
            )
          }
        </Flex>
        <Box display={myStream ? "block" : "none"} position={"absolute"} left={"0"} right={'0'} w={"100%"} h={"90vh"} zIndex={4} borderRadius={"20px"} style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }}>
          <Box>
            <Text textAlign={"center"} mt={4}>timer</Text>
            <br />
            <Box borderRadius={"20px"} mx={2} overflow={"hidden"}>
              {
                myStream && <ReactPlayer muted={muted} playing={playing} width={"100%"} height={"100%"} url={myStream} />
              }
            </Box>
            <Flex mt={4} justifyContent={"center"} gap={"20px"}>
             <Button onClick={()=>setMuted(!muted)} style={{
              backgroundColor:muted?"red":""
             }}><BsMicMuteFill size={"30px"}/></Button>
             <Button onClick={()=>setPlaying(!playing)}>{playing?<FaPause size={"25px"}/>:<FaPlay size={"25px"} />}</Button>
             <Button onClick={handleClose}><IoCall size={"30px"} color='red'/></Button>
            </Flex>
          </Box>
        </Box>
        <MessageInput setMessages={setMessages} />
      </Flex>

    </>
  )
}

export default MessageContainer
