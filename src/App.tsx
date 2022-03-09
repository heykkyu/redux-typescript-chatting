import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatList from './container/ChatList';
import ChatRoom from './container/ChatRoom';
import "./assets/css/_common.scss";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/list' element={<ChatList/>} />
          <Route path='/room/:room_id' element={<ChatRoom/>} />
          <Route path="*" element={<Navigate to="/list" /> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
