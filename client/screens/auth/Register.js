import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InputBox from "@/components/Forms/InputBox";
import SubmitButton from "@/components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        alert("Every field is Require");
      }
      const { data } = await axios.post(`/auth/register`, {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={style.container}>
        <Text style={style.text}>Register</Text>
        <View>
          <InputBox inputTitle={"Name"} value={name} setValue={setName} />
          <InputBox
            inputTitle={"Email"}
            keyboardType={"email-address"}
            autoComplete={"email"}
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={"Password"}
            secureTextEntry={true}
            autoComplete={"password"}
            value={password}
            setValue={setPassword}
          />
        </View>
        <View>
          <SubmitButton
            btnName={"Register"}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
        <Text>
          Already Registered?{" "}
          <Text style={style.text} onPress={() => navigation.navigate("Login")}>
            Login Now
          </Text>
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default Register;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "#fff",
    width: 300,
    height: 50,
  },
});
