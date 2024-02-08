import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import axios from "axios";
const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

function StreamingPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let localStream = null;
    const peerConnection = new RTCPeerConnection(configuration);
    const signalingServer = new WebSocket("ws://localhost:3005/connection");

    async function captureLocalMedia() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });

        // 로컬 비디오 스트림을 페이지에 표시 (선택적)
        const localVideo = document.getElementById("localVideo");
        if (localVideo) {
          localVideo.srcObject = localStream;
        }
      } catch (error) {
        console.error("Error capturing local media", error);
      }
    }

    signalingServer.onopen = async () => {
      await captureLocalMedia();
      signalingServer.send(JSON.stringify({ type: "join", roomId: id }));
    };

    // 나머지 시그널링 및 WebRTC 로직...

    return () => {
      // 컴포넌트 언마운트 시 리소스 정리
      peerConnection.close();
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, [id]);
  const handleEndStream = async () => {
    try {
      // 서버에 방송 종료 요청을 보냅니다.
      await axios.patch(
        `${process.env.REACT_APP_SERVER_HOST}/api/rooms/${id}/end`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Stream ended successfully");
      navigate("/"); // 방송 종료 후 메인 페이지 또는 적절한 경로로 리디렉션
    } catch (error) {
      console.error("Failed to end the stream:", error);
    }
  };
  return (
    <div>
      <h2>Streaming Page</h2>
      <video
        id="localVideo"
        autoPlay
        playsInline
        muted
        style={{ width: "300px" }}
      ></video>
      <video
        id="remoteVideo"
        autoPlay
        playsInline
        style={{ width: "300px" }}
      ></video>
      <ChatRoom />
      <button onClick={handleEndStream}>End Stream</button>
    </div>
  );
}

export default StreamingPage;
