import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from '../../AuthContext'
import { useNavigate, Navigate } from "react-router-dom";


const Dashboard = () => {


  const { user } = useContext(AuthContext);
  
  return (
    <div className="flex">
      <h1>Profile</h1>

    </div>
  );
};

export default Dashboard;
