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

  const isUserAdded = (userId) => {
    // Add your logic to check if the user exists in your database
    // For simplicity, assuming the user exists if it's in the list fetched from the API
    return users.some(user => user.id === userId);
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
