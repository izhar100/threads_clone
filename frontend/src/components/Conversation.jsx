import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, WrapItem, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { BsCheck2All } from 'react-icons/bs'
import { selectedConversationAtom } from '../atoms/messagesAtom'

const Conversation = ({conversation}) => {
  const participant=conversation.participants[0]
  const currentUser=useRecoilValue(userAtom)
  const [selectedConversation,setSelectedConversation]=useRecoilState(selectedConversationAtom)
  const navigate=useNavigate()
  return (
    <>
      <Flex mt={2}
      gap={4} alignItems={"center"} p={"2"} 
      _hover={{cursor:'pointer',bg:useColorModeValue("gray.500","gray.dark"),color:"white"}}
      borderRadius={"md"}
      onClick={()=>{
        setSelectedConversation({
          _id:conversation._id,
          userId:participant._id,
          userProfilePic:participant.profilePic,
          username:participant.username,
          name:participant.name,
          mock:conversation.mock
        })
        localStorage.setItem("selectedConversation",JSON.stringify({
          _id:conversation._id,
          userId:participant._id,
          userProfilePic:participant.profilePic,
          username:participant.username,
          name:participant.name
        }))
        navigate("/conversation/chats")
      }}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"}
      >
        <WrapItem>
            <Avatar
            src={participant.profilePic} name={participant.name}
            >
            <AvatarBadge boxSize={'1em'} bg={"green.500"}/>
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"}>
          <Text fontWeight={'700'} display={"flex"} alignItems={"center"}>
            {participant.name} <Image display={participant.username=="ezhar"?"inline":"none"} src='/verified.png' w={4} h={4} ml={1}/>
          </Text>
          <Box fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}
          >
            {currentUser?._id===conversation.lastMessage.sender?<BsCheck2All size={16}/>:""}
            <Text noOfLines={1}>{conversation.lastMessage.text}</Text>
            </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default Conversation
