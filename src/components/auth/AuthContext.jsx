import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser({ token }); // 사용자가 로그인된 상태임을 설정
    } else {
      setCurrentUser(null); // 사용자가 로그아웃된 상태임을 설정
    }
  }, []);

  console.log("rerer");

  // 로그인 처리 함수
  const login = (token) => {
    localStorage.setItem("token", token);
    setCurrentUser({ token }); // 사용자 상태 업데이트
  };

  // 로그아웃 처리 함수
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null); // 사용자 상태 업데이트
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
