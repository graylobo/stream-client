import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function HomePage() {
  const [liveRooms, setLiveRooms] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchLiveRooms = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/api/live-rooms`
      );
      setLiveRooms(response.data);
    };

    fetchLiveRooms();
  }, []);

  return (
    <div>
      <h2>Live Rooms</h2>
      {currentUser && (
        <Link to="/create-room">
          <button>Create Room</button>
        </Link>
      )}
      <ul>
        {liveRooms.map((room) => (
          <li key={room._id}>
            <Link to={`/stream/${room._id}`}>
              {/* 썸네일 이미지와 방제목을 클릭 시 해당 스트리밍 페이지로 이동 */}
              <div>
                {room.thumbnail && (
                  <img
                    src={room.thumbnail}
                    alt="Thumbnail"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <p>
                  {room.host.username} - {room.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
