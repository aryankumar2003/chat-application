import React, { useState, useEffect } from 'react';
import socketService from '../services/socketService';
import axios from 'axios';
import './Chatdashboard.css';
import Navbar from "../component/navbar"
import Sidebar from "../component/sidebar";

const Chatdashboard=()=>{
    return(
        <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-blue-600">Welcome to My Website!</h1>
        </div>
        <div><Sidebar/></div>
        
      </div>
    )
}
export default Chatdashboard;