const { default: axios } = require("axios");
const { Post } = require("../model/post.model");
const  ExcelJS=require("exceljs");
const { User } = require("../model/user.model");
const getPost=async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = response.data;
    res.json(posts);
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

const downloadExcel= async (req, res) => {
    const userId = req.params.userId;
    try {
      // Fetch posts for the specific user
      const user = await User.findOne({ id: userId });
      const posts = await Post.find({userId});

      if (posts.length === 0) {
        res.status(404).json({ message: 'No posts found for this user' });
        return;
      }

      // Create Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

      // Define worksheet columns
      worksheet.columns = [
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Body', key: 'body', width: 60 },
      ];

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