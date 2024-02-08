// src/components/CreateRoomPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Redirect after creating a room

function CreateRoomPage() {
  const [roomData, setRoomData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevRoomData) => ({
      ...prevRoomData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/api/rooms`,
        roomData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // 서버로부터 받은 방의 ID를 사용하여 리디렉션
      const roomId = response.data._id; // 가정: 서버가 방의 _id를 응답의 일부로 보낸다고 가정
      navigate(`/stream/${roomId}`); // 개설된 방의 상세 페이지로 리디렉션
    } catch (error) {
      console.error("Creating room failed:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={roomData.title}
          onChange={handleChange}
          placeholder="Room Title"
        />
        <textarea
          name="description"
          value={roomData.description}
          onChange={handleChange}
          placeholder="Room Description"
        ></textarea>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
