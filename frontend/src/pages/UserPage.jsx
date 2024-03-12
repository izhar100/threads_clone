import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
// import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Post from '../components/Post'
import getUserProfile from '../hooks/getUserProfile'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import { api } from '../api'

const UserPage = () => {
  const { loading, user } = getUserProfile()
  const showToast = useShowToast()
  const { username } = useParams()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [fetchingPosts, setFetchingPosts] = useState(false)
  const [page, setPage] = useState(1)
  const [allDone, setAllDone] = useState(false)

  useEffect(() => {
    console.log("page:", page)
    const getPosts = async () => {
      setFetchingPosts(true)
      if (page == 1) {
        setPosts([])
      }
      try {
        const res = await fetch(`${api}/posts/user/${username}?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
          }
        })
        const data = await res.json()
        if (data.error) {
          return showToast("Error", data.error, "error")
        }
        if (data.length == 0 && posts.length > 0) {
          setAllDone(true)
        }
        setPosts((preData) => [...preData, ...data])
      } catch (error) {
        showToast("Error", error, "error")
        setPosts([])
      } finally {
        setFetchingPosts(false)
      }
    }
    getPosts()

  }, [username, showToast, setPosts, page])

  const handleLoadMore = () => {
    setPage(pre => pre + 1)
  }

  if (!user && loading) {
    return <Loader />
  }
  if (!user && !loading) {
    return <NotFound text={"User"} />
  }
  return (
    <>
      <UserHeader user={user} />
      {
        fetchingPosts && <Loader />
      }
      {
        !fetchingPosts && posts?.length == 0 && (
          <Heading mt={10} textAlign={"center"}>No any post found!</Heading>
        )
      }
      {
        !fetchingPosts && posts?.length > 0 && (
          posts?.map((post, ind) => (
            <Post key={post._id + ind} post={post} postedBy={post.postedBy} lastPost={posts.length} index={ind + 1} />
          ))
        )
      }
      {
        posts.length > 0 && (
          <Box>
            <hr />
            <Flex my={2} justifyContent={"center"}>{
              allDone ? "No more posts found!" : <Button colorScheme='blue' onClick={handleLoadMore} isLoading={loading}>Load More</Button>
            }</Flex>
          </Box>
        )
      }
    </>
  )
}

export default UserPage
