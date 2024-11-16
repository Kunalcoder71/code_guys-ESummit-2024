import React from 'react'
import Room from './Room'
import Roompage from './Roompage'
import styles from "../style/codepannel.module.css"
import { useParams } from 'react-router-dom';
import Codepannel from './Codepannel';
import ChatComponent from './Chatcomponent';

const VideoRoom = () => {
  const {roomKey} = useParams(); 
  console.log(roomKey)
  return (
    <div style={{display:"flex", height:"100vh" ,backgroundColor:"#FAF5E9"}}>
      <div>
      <Room />
      <ChatComponent roomId={roomKey}/>
      </div>
      
      <div className={styles.main}>
          <Codepannel  roomId={roomKey} />
      </div>
    </div>
  )
}

export default VideoRoom