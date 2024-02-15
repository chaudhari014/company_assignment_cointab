const { default: axios } = require("axios");
const { Post } = require("../model/post.model");
const  ExcelJS=require("exceljs");
const { User } = require("../model/user.model");
const getPost=async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const checkUser =await User.find({id:userId})
    if(checkUser.length<=0){
             return res.status(400).json({"message":"user not exist in db"})
    }
    const localUserPost=await Post.find({userId})
    const posts = response.data;
    let exist=false
   // console.log(posts)
    if(localUserPost.length>0){
       exist=true
       return  res.json({data:posts,exist:true,user:checkUser[0]});
    }

    
   return res.json({data:posts,exist:false,user:checkUser[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const addBulkPost=async (req, res) => {
  const userId = req.params.userId;
  const postsData = req.body;
  
  try {
    // Check if posts for the user already exist
    const existingPosts = await Post.find({ userId });
    if (existingPosts.length > 0) {
      res.json({ message: 'Posts already exist for this user' });
    } else {
      // Bulk insert posts for the user
      const posts = await Post.insertMany(postsData);
      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const downloadExcel = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Fetch posts for the specific user
        const user = await User.findOne({ id: userId });
        const posts = await Post.find({ userId });

        if (posts.length === 0) {
            res.status(404).json({ message: 'No posts found for this user' });
            return;
        }

        // Create Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Posts');

        // Define worksheet columns
        worksheet.columns = [
            { header: 'User Name', key: 'userName', width: 20 },
            { header: 'Company', key: 'company', width: 30 },
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Body', key: 'body', width: 30 },
        ];

        // Add user information to the worksheet
        worksheet.addRow({ userName: user.name, company: user.company?.name });

        // Set styles for user name and company
        const userNameRow = worksheet.getRow(2);
        userNameRow.font = { bold: true, color: { argb: 'FF0000' } }; // Adjust the color as needed

        const companyRow = worksheet.getRow(2);
        companyRow.font = { italic: true, color: { argb: '008000' } }; // Adjust the color as needed

        // Add data to the worksheet
        posts.forEach(post => {
            worksheet.addRow({ title: post.title, body: post.body });
        });

        // Set up response headers for Excel file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=posts_${userId}.xlsx`);

        // Pipe the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports={addBulkPost,getPost,downloadExcel}