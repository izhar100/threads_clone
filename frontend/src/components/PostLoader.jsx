import { Box, Flex, SkeletonCircle, SkeletonText, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const PostLoader = () => {
    return (
        <>
            <Stack padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.dark')}>
                <Flex alignItems="center" gap="20px">
                    <SkeletonCircle size='20' />
                    <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                </Flex>
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='40' />
                <Box ml={5}>
                    <Flex alignItems="center" gap="20px">
                        <SkeletonCircle size='20' />
                        <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                    </Flex>
                    <Box ml={"20"}>
                        <SkeletonText my={1} noOfLines={1} spacing='4' skeletonHeight='2' />
                        <SkeletonText my={1} noOfLines={1} spacing='4' skeletonHeight='2' />
                    </Box>
                    <br />
                    <Flex alignItems="center" gap="20px">
                        <SkeletonCircle size='20' />
                        <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                    </Flex>
                    <Box ml={"20"}>
                        <SkeletonText my={1} noOfLines={1} spacing='4' skeletonHeight='2' />
                        <SkeletonText my={1} noOfLines={1} spacing='4' skeletonHeight='2' />
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default PostLoader
