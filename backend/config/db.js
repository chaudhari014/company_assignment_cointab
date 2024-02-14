const mongoose=require("mongoose")
require("dotenv").config()
const connect_db=mongoose.connect(process.env.MONGODB_URL)

module.exports={connect_db}
