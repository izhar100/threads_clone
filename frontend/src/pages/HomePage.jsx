import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <Link to={"/markzuckerberg"}>
        <Flex w={'full'} justifyContent={"center"}>
        <Button>Visit Profile</Button>
        </Flex>
      </Link>
    </>
  )
}

export default HomePage
