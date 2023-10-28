const express=require("express")
const cors=require("cors")
const app=express()
const cookieParser=require('cookie-parser')
const { connectionDB } = require("./db/connection")
const { userRouter } = require("./routes/userRoutes")
const { postRouter } = require("./routes/postRoutes")
require('dotenv').config()
const port=process.env.port||8080
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//Routes
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.listen(port,async()=>{
   try {
      await connectionDB
      console.log('connected to database')
      console.log(`server is running at port:http://localhost:${port}`)
   } catch (error) {
    console.log("error connecting to server")
    console.log(error)
   }
})