// src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from '../API';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API}/users/all`)
      .then(response => {
        console.log(response.data.data)
        setUsers(response.data.data)})
      .catch(error => console.error(error));
  }, []);

  const handleAddButtonClick = (user) => {
    axios.post(`${API}/users/add`, user)
      .then(response => {
        if (response.status === 200) {
          // Update the local state to include the new user
          let updatedUser=users.map((el)=>{
            if(el.id===user.id ){
              el.existsLocally=true
              return el
            }
            return el
          })
          setUsers(updatedUser);
        }
      })
      .catch(error => console.error(error));
  };
  return (
    <div>
      <h2>User Details</h2>
      <table className="user-details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>City</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.address?.city}</td>
              <td>{user.company?.name}</td>
              <td>
                {user.existsLocally===true ? (
                  <Link to={`/posts/${user.id}`}>
                    <button className="open-button">Open</button>
                  </Link>
                ) : (
                  <button className="add-button" onClick={() => handleAddButtonClick(user)}>
                    Add
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
