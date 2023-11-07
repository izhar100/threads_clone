import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import userAtom from "../atoms/userAtom";


const SocketContext=createContext();

export const useSocket=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    const user=useRecoilValue(userAtom)
    const [onlineUsers,setOnlineUsers]=useState([])
    useEffect(()=>{
        // const socket=io("http://localhost:8000",{
        //     query:{
        //         userId:user?._id
        //     }
        // })
        // setSocket(socket)
        
        // socket.on("getOnlineUsers",(users)=>{
        //     setOnlineUsers(users)
        // })
        // return ()=>socket && socket.close()
        // Ensure socket is created only once, and don't recreate it on re-renders
       if (user) {
        const socket = io("https://threads-backend-vercel.vercel.app", {
          query: {
            userId: user?._id,
          },
        });
        setSocket(socket);
  
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });
  
        // Close the socket when the component unmounts
        return () => socket.close();
      }
    },[user?._id])


    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
           {children}
        </SocketContext.Provider>
    )
}