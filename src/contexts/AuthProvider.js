import { Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../fireBase/config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let history = useNavigate();

  useEffect(() => {
    const unSubrise = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        history("./");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setUser({});
      history("/login");
    });

    return () => {
      unSubrise();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
