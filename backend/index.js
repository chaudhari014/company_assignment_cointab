const express=require("express")
const cors=require("cors")
const { connect_db } = require("./config/db")
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.js.route');
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
// route not found
app.use((req,res)=>{
   return res.status(404).json({msg:"end point not found"})
})

// catch internal server error
app.use((err,req,res)=>{
    console.log(err.message,"server error")
   return res.status(500).json({msg:"server error" })
})

const port=process.env.PORT || 8010

app.listen(port,async()=>{
    try {
        await connect_db
        console.log("db connected")
    } catch (err) {
        console.log(err)
    }
    console.log("server is running")
})

