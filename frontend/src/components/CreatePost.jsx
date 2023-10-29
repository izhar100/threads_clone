import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'

const MAX_CHAR=500
const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {handleImageChange,imgUrl,setImgUrl}=usePreviewImg()
    const [postText,setPostText]=useState("")
    const [remainingChar,setRemainingChar]=useState(MAX_CHAR)
    const imageRef=useRef(null)
    const user=useRecoilValue(userAtom)
    const showToast=useShowToast()
    const [loading,setLoading]=useState(false)
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
        const res=await fetch('/api/posts/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({postedBy:user._id,text:postText,img:imgUrl})
           })
           const data=await res.json();
           if(data.error){
            showToast("Error",data.error,"error")
            return;
           }
           showToast("Success","Post created successfully","success")
           onClose()
           setPostText("")
           setImgUrl("")
       } catch (error) {
        showToast("Error",error,"error")
       }finally{
        setLoading(false)
        onClose()
       }
    }
  return (
    <>
      <Button
      position={"fixed"}
      bottom={10} right={10} leftIcon={<AddIcon/>}
      bg={useColorModeValue("gray.300","gray.dark")}
      onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
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