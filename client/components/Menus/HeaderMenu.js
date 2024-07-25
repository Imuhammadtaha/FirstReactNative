import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setState({ token: "", user: null });
      await AsyncStorage.removeItem("auth");
      alert("Logout Successfull");
    } catch (error) {
      alert(`Error in Logging Out ${error}`);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <FontAwesome5 name="sign-out-alt" color={"red"} style={style.icon} />
    </TouchableOpacity>
  );
};

export default HeaderMenu;

const style = StyleSheet.create({
  footer: { flexDirection: "row", justifyContent: "space-between" },
  icon: {
    alignSelf: "center",
    fontSize: 25,
  },
});
