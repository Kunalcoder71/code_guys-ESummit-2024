// Codepannel.js
import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import styles from "../style/codepannel.module.css"

const socket = io('http://localhost:5000');

function Codepannel({ roomId }) {
  console.log("this is it:", roomId)
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  // Load existing code when joining the room
  useEffect(() => {
    // Emit join event with the roomId
    socket.emit('joinRoom', roomId);

    // Listen for code updates from the server
    socket.on('codeUpdated', (existingCode) => {
      setCode(existingCode); // Set the existing code received
    });

    // Clean up the listener on unmount
    return () => {
      socket.off('codeUpdated'); // Clean up
    };
  }, [roomId]);

  // Handle code change from the editor and emit to server
  const handleCodeChange = (value) => {
    setCode(value || "");
    socket.emit('codeUpdate', value, roomId); // Emit updated code

  };


  return (
    <div className={styles.room_codepannel} >
      <div className={styles.code_main}>
        <h1 className={styles.code_head} >Collaborative Code Editor</h1>

        {/* Language Selection */}
        <label className={styles.code_label}>Select Language: </label>
        <select className={styles.code_select} onChange={(e) => setLanguage(e.target.value)} value={language} style={{ marginBottom: "20px" }}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>

        {/* Code Editor */}
        <MonacoEditor
          className={styles.code_editor}
          // height="400px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

export default Codepannel;
