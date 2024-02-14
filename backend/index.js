const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())

app.listen(7040,()=>{
    console.log("server is running")
})

