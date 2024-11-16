import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../style/joinroom.module.css"

const JoinRoom = () => {
  const [roomKey, setRoomKey] = useState('');
  const [Name, setname] = useState('');
  const navigate = useNavigate();

  const joinRoom = () => {
    localStorage.setItem("username", Name);
    console.log(Name)

    navigate(`/room/${roomKey}`); // Redirect to room with key
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.join_text}>Join a Room</h2>
      <input
      className={styles.join_input}
        type="text"
        value={roomKey}
        onChange={(e) => setRoomKey(e.target.value)}
        placeholder="Enter Room Key"
      />
      <h2>Name</h2>
      <input
      className="a"
        type="text"
        value={Name}
        onChange={(e) => setname(e.target.value)}
        placeholder="Enter Room Key"
      />
      <button className={styles.join_btn} onClick={joinRoom}>Join Room</button>
    </div>

  );
};

export default JoinRoom;
