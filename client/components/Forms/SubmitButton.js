import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ btnName, loading, handleSubmit }) => {
  return (
    <TouchableOpacity style={style.btn} onPress={handleSubmit}>
      <Text style={style.btnText}>{loading ? "Loading" : btnName}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const style = StyleSheet.create({
  btn: {
    backgroundColor: "black",

    width: 200,
    marginTop: 20,
    borderRadius: 100,
  },
  btnText: {
    display: "flex",
    color: "white",
    alignItems: "center",
    textAlign: "center",
    height: 50,
    top: "25%",
    justifyContent: "center",
  },
});
