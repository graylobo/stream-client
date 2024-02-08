// RoomList.jsx 수정 예시
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 임포트합니다.

export default function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get("http://localhost:3005/api/rooms");
      console.log("res", response);
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>방송룸 목록</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <Link to={`/stream/${room._id}`}>
              {room.title} - {room.host.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
