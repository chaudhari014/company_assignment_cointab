const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    userId:Number,
    title:String,
    body:String,
    id:Number
})

const Post = mongoose.model('Post', postSchema);

module.exports = {Post};