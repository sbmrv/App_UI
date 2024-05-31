// navigation/StackNavigator.js
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/SigninPage";
import HomeScreen from "../components/HomePage";
import SignupScreen from "../components/SignUpPage";

const Stack = createStackNavigator();
function StackNavigator() {
  const [userData, setUserData] = useState({});
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <LoginScreen
              {...props}
              setUserData={setUserData}
              userData={userData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} userData={userData} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" options={{ headerShown: false }}>
          {(props) => (
            <SignupScreen
              {...props}
              setUserData={setUserData}
              userData={userData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
