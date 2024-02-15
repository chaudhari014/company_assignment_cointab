const { default: axios } = require("axios");
const { User } = require("../model/user.model");

const getAllUser = async (req, res) => {
  try {
    // Fetch users from the external API
    const externalResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const externalUsers = externalResponse.data;

    // Fetch users from your local database (replace this with your actual database query)
    const localUsers = await User.find(); // Example: Assuming you are using Mongoose

    // Combine external and local users
    const allUsers = externalUsers.map(externalUser => {
      const userExistsLocally = localUsers.some(localUser => localUser.id === externalUser.id);
      return {
        ...externalUser,
        existsLocally: userExistsLocally,
      };
    });

    return res.json({data:allUsers});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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