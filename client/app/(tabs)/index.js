import { AuthProvider } from "@/context/authContext";
import RootNavigation from "@/navigations";

// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </>
  );
}
