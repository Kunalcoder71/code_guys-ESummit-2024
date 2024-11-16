import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Room from './components/Room';
import VideoRoom from './components/VideoRoom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className='firstdiv'>
          <h1 className='welcome-text'>Welcome to Live Video Room</h1>
          <JoinRoom />
          <CreateRoom />
        </div>} />
        <Route path="/room/:roomKey" element={<VideoRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
