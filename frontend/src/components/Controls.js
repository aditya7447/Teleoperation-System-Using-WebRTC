import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Controls = () => {
  // Establish WebSocket connection to the server
  const socket = io("http://localhost:5000");

  // Send command to the server
  const sendCommand = (command) => {
    socket.emit("control", command);
  };

  // Listen for incoming control commands from the server and log them to the console
  useEffect(() => {
    socket.on("control", (command) => {
      console.log("Received control command:", command);  // Log the command in the browser console
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off("control");
    };
  }, []);

  return (
    <div className="controls-container">
      <div className="controls-text">
        <h1>Controls</h1>
      </div>
      <div className="controls-buttons">
        <button onClick={() => sendCommand("FORWARD")}>Forward</button>
        <button onClick={() => sendCommand("BACKWARD")}>Backward</button>
        <button onClick={() => sendCommand("LEFT")}>Left</button>
        <button onClick={() => sendCommand("RIGHT")}>Right</button>
      </div>
    </div>
  );
};

export default Controls;
