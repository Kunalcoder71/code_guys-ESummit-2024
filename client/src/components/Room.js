// src/components/Room.js

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ReactPlayer from 'react-player';
import styles from "../style/room.module.css"

const socket = io('https://livesitebackend.onrender.com'); // Your socket server URL

const Room = () => {
  const { roomKey } = useParams();
  console.log(roomKey)
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    const storedVideoUrl = localStorage.getItem(`videoUrl-${roomKey}`);
    if (storedVideoUrl) {
      setCurrentVideo(storedVideoUrl);
      setVideoUrl(storedVideoUrl);
    }

    socket.emit('joinRoom', roomKey);

    socket.on('videoUrl', (url) => {
      setCurrentVideo(url);
      setVideoUrl(url);
      localStorage.setItem(`videoUrl-${roomKey}`, url);
    });

    socket.on('playVideo', (time) => {
      if (playerRef.current && !isPlaying) {
        playerRef.current.seekTo(time, 'seconds');
        setIsPlaying(true);
      }
    });

    socket.on('pauseVideo', (time) => {
      if (playerRef.current && isPlaying) {
        playerRef.current.seekTo(time, 'seconds');
        setIsPlaying(false);
      }
    });

    socket.on('seekVideo', (time) => {
      if (playerRef.current && !seeking) {
        playerRef.current.seekTo(time, 'seconds');
      }
    });

    return () => {
      socket.off('videoUrl');
      socket.off('playVideo');
      socket.off('pauseVideo');
      socket.off('seekVideo');
    };
  }, [roomKey, isPlaying, seeking]);

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (!ReactPlayer.canPlay(videoUrl)) {
      alert('Please enter a valid video URL');
      return;
    }
    socket.emit('sendVideoUrl', videoUrl, roomKey);
    setCurrentVideo(videoUrl);
    localStorage.setItem(`videoUrl-${roomKey}`, videoUrl);
    setVideoUrl('');
  };

  const handlePlay = () => {
    const currentTime = playerRef.current.getCurrentTime();
    socket.emit('playVideo', currentTime, roomKey);
    setIsPlaying(true);
  };

  const handlePause = () => {
    const currentTime = playerRef.current.getCurrentTime();
    socket.emit('pauseVideo', currentTime, roomKey);
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const time = e.playedSeconds;
    setSeeking(true);
    socket.emit('seekVideo', time, roomKey);
    setTimeout(() => setSeeking(false), 500); // Avoids multiple seeks in quick succession
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.room_head}>Room: {roomKey}</h1>
      <form onSubmit={handleVideoSubmit}>
        <input
        className={styles.room_input}
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter Video URL"
          required
        />
        <button className={styles.room_btn} type="submit">Play Video</button>
      </form>

      {currentVideo && (
        <div className={styles.room_video_container} >
          <h2 className={styles.room_playing} >Now Playing:</h2>
          <ReactPlayer
          className={styles.room_video}
            ref={playerRef}
            url={currentVideo}
            controls
            width="100%"
            height="100%"
            playing={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={handleSeek}
          />
        </div>
      )}
    </div>
  );
};

export default Room;
