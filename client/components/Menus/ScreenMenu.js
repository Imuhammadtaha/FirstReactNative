import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";

import Register from "@/screens/auth/Register";
import Login from "@/screens/auth/Login";
import Home from "@/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderMenu from "./HeaderMenu";
import Post from "@/screens/Post";
import About from "@/screens/About";
import Account from "@/screens/Account";

const ScreenMenu = () => {
  //Global State
  const [state] = useContext(AuthContext);

  const authedUser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      {authedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
