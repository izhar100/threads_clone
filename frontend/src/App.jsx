import { Button, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilepage from "./pages/UpdateProfilePage"
import CreatePost from "./components/CreatePost"
import SearchPage from "./pages/SearchPage"

function App() {
  const user=useRecoilValue(userAtom)

  return (
    <>
     <Header/>
      <Container maxW={"620px"}>
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/" element={ user?<HomePage/>:<Navigate to={"/auth"}/>}/>
          <Route path="/update" element={ user?<UpdateProfilepage/>:<Navigate to={"/auth"}/>}/>
          <Route path="/auth" element={!user?<AuthPage/>:<Navigate to={"/"}/>}/>
          <Route path="/:username" element={<UserPage/>} />
          <Route path="/:username/post/:pid" element={<PostPage/>} />
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
        {/* {user && <LogoutButton/>} */}
        {/* {user && <CreatePost/>} */}
      </Container>

    </>
  )
}

export default App
