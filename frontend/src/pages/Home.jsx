import React,{useState} from 'react'
import UserDetails from '../components/UserDetails'

const Home = () => {
    const [flag,setFlag]=useState(false)
  return (
     <div className="home-container">
      <h1 className="header">Cointab SE-ASSIGNMENT</h1>
      
        <button className="all-users-button" onClick={()=>setFlag(true)}>All Users</button>
       {
        flag && <UserDetails/>
       }
    </div>
  )
}

export default Home
