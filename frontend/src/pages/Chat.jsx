import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Conversation from '../components/Conversation'
import NoChats from '../components/NoChats'
import useShowToast from '../hooks/useShowToast'
import { api } from '../api'
import { useRecoilState, useRecoilValue } from 'recoil'
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtom'
import userAtom from '../atoms/userAtom'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'

const Chat = () => {
    const [searchText, setSearchText] = useState()
    const showToast = useShowToast()
    const [loading, setLoading] = useState(true)
    const [conversations, setConversation] = useRecoilState(conversationsAtom)
    const currentUser = useRecoilValue(userAtom)
    const [searchLoading, setSearchLoading] = useState(false)
    const [selectedConversation,setSelectedConversation]=useRecoilState(selectedConversationAtom)
    const navigate=useNavigate()
    const {socket,onlineUsers}=useSocket()

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await fetch(`${api}/messages/conversations`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    }
                })
                const data = await res.json()
                if (data.error) {
                    return showToast("Error", error.message, "error")
                }
                setConversation(data)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setLoading(false)
            }
        }
        getConversation()
    }, [loading, showToast])

    const handleConversationSearch = async (e) => {
        if (searchLoading) return;
        setSearchLoading(true)
        try {
            const res = await fetch(`${api}/users/profile/${searchText}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            const searchedUser = await res.json()
            if (searchedUser.error) {
                return showToast("Error", searchedUser.message, "error")
            }
            const messagingYourself = currentUser._id == searchedUser._id;
            if (messagingYourself) {
                return showToast("Error", "You can't message yourself", "error")
            }
            const conversationAlreadyExists = conversations.find((conversation) => conversation.participants[0]._id == searchedUser._id);
            if (conversationAlreadyExists) {
                const selected = {
                    _id: conversationAlreadyExists._id,
                    userId: searchedUser._id,
                    userProfilePic: searchedUser.profilePic,
                    username: searchedUser.username,
                    name: searchedUser.name
                }
                setSelectedConversation(selected)
                localStorage.setItem("selectedConversation",JSON.stringify(selected))
                navigate("/conversation/chats")  
            }
            const mockConversation={
                mock:true,
                lastMessage:{
                    text:"👋Tap and say hi to start chatting!"
                },
                _id:Date.now(),
                participants:[
                    {
                        _id:searchedUser._id,
                        username:searchedUser.username,
                        name:searchedUser.name,
                        profilePic:searchedUser.profilePic
                    }
                ]
            }
            setConversation((prevConvs)=>[mockConversation,...prevConvs])
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setSearchLoading(false)
        }
    }
    return (
        <>
            <InputGroup border={"2px solid gray.dark"} borderRadius={"10px"} boxShadow={"rgba(0, 80, 123, 0.093) 0px 4px 12px"}>
                <Input onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search' />
                <InputRightElement>
                    <Button isLoading={searchLoading} bg={"#ffffff0"} _hover={{bg:"#ffffff0"}}>
                        <SearchIcon cursor={"pointer"} color='gray.300' onClick={handleConversationSearch} />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <br />
            {
                loading && (
                    [0, 1, 2, 3, 4].map((el, i) => (
                        <Flex key={el} mt={5} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                            <Box>
                                <SkeletonCircle size={"10"} />
                            </Box>
                            <Flex w={"full"} flexDirection={"column"} gap={2}>
                                <Skeleton h={"15px"} w={"30%"} />
                                <Skeleton h={"10px"} w={"100%"} />

                            </Flex>
                        </Flex>
                    ))
                )
            }
            {!loading && (
                conversations?.map((conversation) => (
                    <Conversation key={conversation._id}
                    isOnline={onlineUsers.includes(conversation.participants[0]._id)}
                    conversation={conversation} />
                ))
            )}

            {/* <NoChats/> */}
        </>
    )
}

export default Chat
