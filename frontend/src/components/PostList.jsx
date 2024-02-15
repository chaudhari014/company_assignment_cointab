// src/components/UserPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExcelExporter from './ExcelExporter';
import { useParams } from 'react-router-dom';
import API from '../API';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showBulkAdd, setShowBulkAdd] = useState(true);
  const [user,setUser]=useState({})
  const [showDownloadExcel, setShowDownloadExcel] = useState(false);
  const [exist, setExist] = useState(false);

  const {userId} = useParams();
//console.log(userId,"id")
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/posts/${userId}`);
        // console.log(response.data,"for post")
        setUser(response.data.user)
        setPosts(response.data.data);
        setExist(response.data.exist);
      } catch (error) {
        //console.log(error)
        alert(error.response.data.message)
        console.error(error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleBulkAddClick = async () => {
    try {
      await axios.post(`${API}/posts/bulk-add/${userId}`, posts);
      setShowBulkAdd(false);
      setExist(true)
      setShowDownloadExcel(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${API}/posts/download/${userId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `posts_${userId}.xlsx`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-posts-container">
      <h1 className="header">Cointab SE-ASSIGNMENT</h1>
      <div className="user-info">
        <h3>Name:{user?.name}</h3>
        <h3>Company Name:{user?.company?.name}</h3>
      </div>
      <div className="button-container">
        {/* {showBulkAdd && (
          <button className="bulk-add-button" onClick={handleBulkAddClick}>
            Bulk Add
          </button>
        )}
        {exist && (
          <ExcelExporter posts={posts} userId={userId} onDownload={PostList} />
        )} */}
        {
          exist?<ExcelExporter posts={posts} userId={userId} onDownload={handleDownloadExcel} />:
          <button className="bulk-add-button" onClick={handleBulkAddClick}>
            Bulk Add
          </button>
        }
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id} className='postBox'>
            <h3>Title:{post.title}</h3>
            <p>Body:{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
