import { Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

const UserLoader = () => {
  return (
    <>
      <Flex py={4} w={'full'} justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={5}>
          <SkeletonCircle size='20' />
          <Stack spacing={2}>
            <Skeleton w={"100px"} height='15px' />
            <Skeleton w={"80px"} height='5px' />
            <Skeleton w={"80px"} height='5px' />
          </Stack>
        </Flex>
         <Skeleton height='20px' w="100px" />
      </Flex>
      <Flex py={4} w={'full'} justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={5}>
          <SkeletonCircle size='20' />
          <Stack spacing={2}>
            <Skeleton w={"100px"} height='15px' />
            <Skeleton w={"80px"} height='5px' />
            <Skeleton w={"80px"} height='5px' />
          </Stack>
        </Flex>
         <Skeleton height='20px' w="100px" />
      </Flex>
      <Flex py={4} w={'full'} justifyContent={"space-between"} alignItems={"center"}>
        <Flex alignItems={"center"} gap={5}>
          <SkeletonCircle size='20' />
          <Stack spacing={2}>
            <Skeleton w={"100px"} height='15px' />
            <Skeleton w={"80px"} height='5px' />
            <Skeleton w={"80px"} height='5px' />
          </Stack>
        </Flex>
         <Skeleton height='20px' w="100px" />
      </Flex>
    </>
  )
}

export default UserLoader
