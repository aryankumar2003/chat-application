import React from 'react';

import './App.css'

import Login from './pages/login';
import Register from './pages/register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chatdashboard from './pages/Chatdashboard';
import ProtectedRoute from './components/ProtectedRoute';

const routes = (
  <Router>
    <Routes>
      <Route
        path="/login" exact element={<Login />}
      />
      <Route
        path="/register" exact element={<Register />}
      />
      <Route
        path="/Chatdashboard" exact element={
          <ProtectedRoute>
            <Chatdashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
)


function App() {
  return (
    <div>
      {routes}
    </div>
  )


}

export default App
