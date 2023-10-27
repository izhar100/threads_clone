const mongoose=require("mongoose")
require("dotenv").config()

const connection=async()=>{
    try {
        const conn=await mongoose.connect(process.env.mongoURL,{
            //to avoid warnings
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}

module.exports={
    connection
}