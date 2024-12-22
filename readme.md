# WebRTC WebSocket Controlled Video Stream

This is a full-stack application that uses **React** on the frontend and **Node.js** with **Socket.IO** for real-time WebSocket communication to stream video and control a device (like moving a camera) through a web interface.

## Technologies Used

- **Frontend:**
  - React.js
  - Socket.IO client
  - Axios (for HTTP requests)
  - CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO server
  - Bcrypt (for password hashing)
  - CORS (for cross-origin requests)

## Features

- **Login System:**
  - A simple login form with dummy credentials (`username: admin`, `password: password`).
  - If the login is successful, the user can interact with the video stream and control buttons.

- **WebRTC Video Stream:**
  - Displays live video from the user's webcam.
  - WebRTC-based peer-to-peer communication for video streaming.

- **WebSocket Control Commands:**
  - Send control commands like `FORWARD`, `BACKWARD`, `LEFT`, and `RIGHT` using buttons in the **Controls** component.
  - Commands are broadcasted to all connected clients via WebSocket.

## How to Run the Application

### Prerequisites

Ensure you have the following installed:

- **Node.js** 

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aditya7447/Teleoperation-System-Using-WebRTC
   cd Teleoperation-System-Using-WebRTC
   ```

2. **Install dependencies:**

    - **For the backend (Node.js server):**

        ```bash
        cd backend
        npm install
        ```

   - **For the frontend (React app):**

        ```bash
        cd frontend
        npm install
        ```

3. **Start the server and frontend:**

    - **For the backend (Node.js server):**

        ```bash
        cd backend
        npm install
        ```

    - **For the frontend (React app):**

        ```bash
        cd frontend
        npm install
        ```
        
3. **Access the App:**

     - **Use the following credentials to log in:**
         - Username: admin
         - Password: password

     - **After logging in, you will be able to see the video stream and control buttons.**
      
