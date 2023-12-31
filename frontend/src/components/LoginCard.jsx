import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'
import { api } from '../api'
  
  export default function LoginCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen=useSetRecoilState(authScreenAtom)
    const setUser=useSetRecoilState(userAtom)
    const showToast=useShowToast()
    const [loading,setLoading]=useState(false)
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    })
    const handleLogin=async(req,res)=>{
        if(loading) return;
        setLoading(true)
        try {
            const res=await fetch(`${api}/users/login`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(inputs)
            })
            const data=await res.json()
            console.log(data)
            if(data.error){
                showToast("error",data.error,"error")
                return
            }
            localStorage.setItem("jwt",data.token)
            localStorage.setItem('user-threads',JSON.stringify(data))
            setUser(data)
            
        } catch (error) {
            console.log(error)
            showToast("error",error,"error")
        }finally{
          setLoading(false)
        }
    }
    return (
      <Flex
        align={'center'}
        justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={1}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={6}
            w={{
                base: 'full',
                sm:"400px"
            }}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Login"
                  size="lg"
                  bg={useColorModeValue('gray.600','gray.700')}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('gray.700','gray.800'),
                  }} onClick={handleLogin} isLoading={loading}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Link color={'blue.400'}
                  onClick={()=>setAuthScreen("signup")}
                  >Signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }