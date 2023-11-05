import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import postsAtom from '../atoms/postsAtom'
import { useLocation, useParams } from 'react-router-dom'
import { api } from '../api'

const MAX_CHAR=500
const CreatePost = ({openModal,setOpenModel}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {handleImageChange,imgUrl,setImgUrl}=usePreviewImg()
    const [postText,setPostText]=useState("")
    const [remainingChar,setRemainingChar]=useState(MAX_CHAR)
    const imageRef=useRef(null)
    const user=useRecoilValue(userAtom)
    const [posts,setPosts]=useRecoilState(postsAtom)
    const showToast=useShowToast()
    const [loading,setLoading]=useState(false)
    const location=useLocation()

    const handleTextChange=(e)=>{
      const inputText=e.target.value;
      if(inputText.length>MAX_CHAR){
        const truncatedText=inputText.slice(0,MAX_CHAR)
        setPostText(truncatedText)
        setRemainingChar(0)
      }else{
        setPostText(inputText)
        setRemainingChar(MAX_CHAR-inputText.length)
      }
    }
    const handleCreatePost=async()=>{
        if(loading) return;
        setLoading(true)
       try {
        const res=await fetch(`${api}/posts/create`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            body:JSON.stringify({postedBy:user._id,text:postText,img:imgUrl})
           })
           const data=await res.json();
           if(data.error){
            showToast("Error",data.error,"error")
            return;
           }
           if(location.pathname==`/${user.username}`){
            setPosts([data,...posts])
           }
           showToast("Success","Post created successfully","success")
           onClose()
           if(typeof(setOpenModel)=="function"){
            setOpenModel(false)
           }
           setPostText("")
           setImgUrl("")
       } catch (error) {
        showToast("Error",error,"error")
       }finally{
        setLoading(false)
        onClose()
       }
    }
    // boxShadow={ "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
  return (
    <>
      <Button px={1} borderRadius={50} bgColor={"#009dff39"} position={"fixed"} bottom={4} right={4} onClick={onOpen}
      boxShadow={ "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}>
      <AddIcon cursor={"pointer"} fontSize={22}
      />
      </Button>
      <Modal isOpen={openModal || isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton onClick={()=>{
            if(typeof(setOpenModel)=="function"){
              setOpenModel(false)
            }
            onClose()
          }} />
          <ModalBody>
          <FormControl>
            <Textarea
            placeholder="What's in your mind? type here..."
            onChange={handleTextChange}
            value={postText}
            />
            <Text fontSize={'xs'} fontWeight={'bold'} textAlign={"right"} m={"1"}
            color={useColorModeValue('gray.dark','white')}
            >{remainingChar}/{MAX_CHAR}</Text>
            <Input
            type='file'
            hidden
            ref={imageRef}
            onChange={handleImageChange}
            />
            <BsFillImageFill
            style={{marginLeft:'5px',cursor:'pointer'}}
            size={16}
            onClick={()=>imageRef.current.click()}
            />
           </FormControl>
           {
            imgUrl && (
                <Flex mt={5} w={'full'} position={'relative'}>
                    <Image src={imgUrl} alt='selected image'/>
                    <CloseButton position={'absolute'} top={2} right={2} bg={useColorModeValue('white', 'gray.dark')}
                    onClick={()=>setImgUrl(null)}
                    />
                </Flex>
            )
           }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost
