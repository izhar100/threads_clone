import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { LuSendHorizonal } from 'react-icons/lu';
const MessageInput = () => {
  return (
    <>
      <form>
        <InputGroup>
         <Input w={"full"} placeholder='Type a message...'/>
         <InputRightElement>
          <LuSendHorizonal size={20}/>
         </InputRightElement>
        </InputGroup>
      </form>
    </>
  )
}

export default MessageInput
