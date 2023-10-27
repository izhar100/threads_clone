const express=require("express")
const cors=require("cors")
const cookieParser=require('cookie-parser')
const { connection } = require("./db/connection")
require('dotenv').config()
const port=process.env.port||8080
connection()
const app=express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
//Routes

app.listen(async()=>{
   try {
    console.log(`server is running at port:${port}`)
   } catch (error) {
    console.log("error connecting to server")
    console.log(error)
   }
})