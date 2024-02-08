// RoomDetail.js - 선택한 방송룸의 세부 정보 및 스트리밍 재생 컴포넌트 예시
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomDetail({ match }) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      const response = await axios.get(`/api/rooms/${match.params.id}`);
      setRoom(response.data);
    };
    fetchRoomDetail();
  }, [match.params.id]);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2>{room.title}</h2>
      <p>{room.description}</p>
      {/* 실시간 스트리밍 재생을 위한 컴포넌트 또는 <video> 태그 구현 */}
    </div>
  );
}
