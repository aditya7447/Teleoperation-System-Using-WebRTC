import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const VideoStream = () => {
  const videoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      videoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection();
      stream.getTracks().forEach((track) =>
        peerConnection.current.addTrack(track, stream)
      );

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("signal", { candidate: event.candidate });
        }
      };

      peerConnection.current.ontrack = (event) => {
        const [remoteStream] = event.streams;
        videoRef.current.srcObject = remoteStream;
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current.emit("signal", { description: offer });

      socket.current.on("signal", async (data) => {
        if (data.description) {
          await peerConnection.current.setRemoteDescription(data.description);
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.current.emit("signal", { description: answer });
        } else if (data.candidate) {
          await peerConnection.current.addIceCandidate(data.candidate);
        }
      });
    };

    startVideo();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  //return <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />;
  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoStream;
