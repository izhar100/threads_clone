import { Flex, SkeletonCircle, SkeletonText, Stack, VStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const Loader = () => {
    const location = useLocation()
    const user = useRecoilValue(userAtom)
    return (
        <>
            <Stack display={location.pathname == `/${user?.username}` ? "block" : 'none'} padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.dark')}>
                <Flex alignItems="center" justifyContent="space-between">
                    <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                    <SkeletonCircle size='20' />
                </Flex>
                <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='4' />
            </Stack>
            <Stack padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.dark')}>
                <Flex alignItems="center" gap="20px">
                    <SkeletonCircle size='20' />
                    <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                </Flex>
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='40' />
            </Stack>
            <Stack padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.dark')}>
                <Flex alignItems="center" gap="20px">
                    <SkeletonCircle size='20' />
                    <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                </Flex>
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='40' />
            </Stack>
            <Stack padding='6' boxShadow='lg' bg={useColorModeValue('white', 'gray.dark')}>
                <Flex alignItems="center" gap="20px">
                    <SkeletonCircle size='20' />
                    <SkeletonText skeletonHeight="5" noOfLines={1} w="20%" />
                </Flex>
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='4' />
                <SkeletonText noOfLines={1} spacing='4' skeletonHeight='40' />
            </Stack>
        </>
    )
}

export default Loader
