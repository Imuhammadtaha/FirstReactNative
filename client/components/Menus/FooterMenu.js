import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={style.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5
          name="home"
          style={style.icon}
          color={route.name === "Home" ? "blue" : "black"}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5
          name="plus-square"
          style={style.icon}
          color={route.name === "Post" ? "blue" : "black"}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <FontAwesome5
          name="list"
          style={style.icon}
          color={route.name === "About" ? "blue" : "black"}
        />
        <Text>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5
          name="user"
          style={style.icon}
          color={route.name === "Account" ? "blue" : "black"}
        />
        <Text>User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterMenu;

const style = StyleSheet.create({
  footer: { flexDirection: "row", justifyContent: "space-between" },
  icon: {
    alignSelf: "center",
    fontSize: 25,
  },
});
