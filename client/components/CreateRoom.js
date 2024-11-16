import React, { useState } from 'react';
import axios from 'axios';
import styles from "../style/joinroom.module.css"
const CreateRoom = () => {
  const [roomKey, setRoomKey] = useState('');
  const createRoom = async () => {
    try {
      const response = await axios.post('http://localhost:5000/createRoom');
      setRoomKey(response.data.roomKey);
      
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };
  
  return (
    <div className={styles.create_main}>
      <h2 className={styles.create_text}>Create Room</h2>
      <button  className={styles.create_btn} onClick={createRoom}>Create Room</button>
      {roomKey && (
        <div className={styles.room_key}>
          <h2 className={styles.create_roomH}>Room Created</h2>
          <h3>Room Key: {roomKey}</h3>
          <p>Share this room key with others!</p>
        </div>
      )}
    </div>
  );
  
};

export default CreateRoom;
