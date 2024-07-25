import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Global State
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  axios.defaults.baseURL = "http://192.168.0.106:8080/api/v1";

  // Initial Local Storage
  useEffect(() => {
    const loadLocalStorage = async () => {
      const data = await AsyncStorage.getItem("@auth");
      if (data) {
        const parsedData = JSON.parse(data);
        setState({ ...state, user: parsedData.user, token: parsedData.token });
      }
    };

    loadLocalStorage();
  }, []);
  let token = state && state.token;

  //default axios setting
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
