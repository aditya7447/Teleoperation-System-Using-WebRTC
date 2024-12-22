import React, { useState } from "react";
import Login from "./components/Login";
import VideoStream from "./components/VideoStream";
import Controls from "./components/Controls";

const App = () => {
  // Initially, set the login state to false so that the Login component shows up
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        // Render the Login component and pass the login function to it
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        // Render VideoStream and Controls after successful login
        <>
          <VideoStream />
          <Controls />
        </>
      )}
    </div>
  );
};

export default App;
