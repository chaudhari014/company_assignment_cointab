const { default: axios } = require("axios");
const { User } = require("../model/user.model");

const getAllUser=async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
   return  res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addUser=async (req, res) => {
  const userData = req.body;
  try {
    //check if user already exist
    const existingUser=await User.find({id:req.body.id})
    if(existingUser.length>0){
        return res.status(400).json({ message: 'user already exist' })
    }
    const user = await User.create(userData);
   return  res.json({"message":"data add successfully",data:user});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports={getAllUser,addUser}