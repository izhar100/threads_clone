import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost postImg='/post1.png' likes={234} replies={57} postTitle="Hi let's start using thread."/>
      <UserPost postImg='/post2.png' likes={234} replies={57} postTitle="This is a nice tutorial"/>
      <UserPost postImg='/post3.png' likes={234} replies={57} postTitle="How are you all today?"/>
      <UserPost likes={234} replies={57} postTitle="Testing thread without photo."/>
    </>
  )
}

export default UserPage
