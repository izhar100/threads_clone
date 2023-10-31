const express=require("express")
const cors=require("cors")
const app=express()
const cookieParser=require('cookie-parser')
const { connectionDB } = require("./db/connection")
const { userRouter } = require("./routes/userRoutes")
const { postRouter } = require("./routes/postRoutes")
const cloudinay=require('cloudinary').v2
require('dotenv').config()
const port=process.env.port||8000
app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(express.urlencoded({limit: '50mb',extended:true}))
app.use(cookieParser())

//cloudinay configration
cloudinay.config({
   cloud_name:process.env.CLOUDINAY_NAME,
   api_key:process.env.CLOUDINAY_API_KEY,
   api_secret:process.env.CLOUDINAY_API_SECRET
})


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