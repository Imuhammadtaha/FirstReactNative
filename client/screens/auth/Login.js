import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import InputBox from "@/components/Forms/InputBox";
import SubmitButton from "@/components/Forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  //Global State
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        alert("Every field is Require");
      }
      const { data } = await axios.post(`/auth/login`, { email, password });
      setState(data);
      alert(data && data.message);
      navigation.navigate("Home");
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={style.container}>
        <Text style={style.text}>Login</Text>
        <View>
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
            btnName={"Login"}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
        <Text>
          Not Registered?{"  "}
          <Text
            style={style.text}
            onPress={() => navigation.navigate("Register")}
          >
            SignUp Now
          </Text>
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default Login;

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
