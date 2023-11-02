import { SearchIcon } from '@chakra-ui/icons'
import { Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import useDebounce from '../hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import UserCard from '../components/UserCard'
import UserLoader from '../components/UserLoader'
import { api } from '../api'

const SearchPage = () => {
    const [params, setParams] = useSearchParams()
    const showToast = useShowToast()
    const [users, setUsers] = useState([])
    const [input, setInput] = useState("")
    const name = useDebounce(input, 500)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getUsers = async () => {
            setUsers([])
            setLoading(true)
            try {
                const res = await fetch(`/api/users?search=${name}`)
                const data = await res.json()
                setUsers(data)
            } catch (error) {
                console.log(error)
                showToast("Error", error.message, "error")
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [name])
    useEffect(() => {
        if (input) {
            setParams({ user: input })
        } else {
            setParams("")
        }
    }, [input])

    return (
        <>
            <InputGroup border={"2px solid gray.dark"} borderRadius={"10px"} boxShadow={"rgba(0, 80, 123, 0.093) 0px 4px 12px"}>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input onChange={(e) => setInput(e.target.value)} type='text' placeholder='Search Users' />
            </InputGroup>
            <br />
            {
                loading && (
                    <UserLoader />
                )
            }
            {
                !loading && users?.length == 0 && (
                    <Heading textAlign={"center"}>User not found!</Heading>
                )
            }
            {
                users?.map((user) => (
                    <UserCard key={user._id} user={user} lastUser={users[users?.length - 1]} />
                ))
            }
        </>
    )
}

export default SearchPage
