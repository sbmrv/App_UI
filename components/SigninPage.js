import React from "react";
import { View, Text, TextInput } from "react-native";
import { Avatar, Header, Text as Textrne, Input, Button } from "@rneui/themed";
import { Linking, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import baseUrl from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation, setUserData, userData }) => {
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("adminToken", token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  };
  const handleLogin = async (values, actions) => {
    try {
      const response = await axios.post(
        `${baseUrl}/driver/driver_login`,
        values
      );
      if (response.data.error === false) {
        await setUserData(response.data.driverData);
        await storeToken(response.data.driverData.token);
        navigation.navigate("Home");
      } else {
        return console.log(response.data.message);
      }
      console.log("Login success:", response.data.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleForget = () => {
    Linking.openURL("http://google.com");
  };
  const jumpSignup = () => {
    navigation.navigate("Signup");
  };
  // Define Yup schema for validation
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  return (
    <View style={styles.containerMain}>
      <Textrne h4 style={{ marginBottom: 40 }}>
        {/* {title} */}
        To-do list
      </Textrne>
      <Textrne
        h3
        h3Style={{ fontSize: 24, fontWeight: "bold" }}
        // style={{ marginBottom: 10, fontSize: 24, backgroundColor: "red" }}
      >
        Log in to your account
      </Textrne>
      {/* <button onClick={openDig}>signUp here..</button> */}
      <View style={{ width: "100%" }}>
        {/* <Avatar
        size={32}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      /> */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ marginTop: 20 }}>
              <Input
                placeholder="Email"
                containerStyle={{
                  width: "100%",
                  marginTop: 10,
                  padding: 5,
                }}
                inputContainerStyle={{
                  width: "100%",
                  borderColor: "rgba(0, 0, 0, 0)",
                  borderRadius: 8,
                  backgroundColor: "rgb(241, 243, 244)",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                inputStyle={{
                  fontSize: 16,
                  fontWeight: "normal",
                  height: 50,
                }}
                errorStyle={{ color: "red" }}
                // errorMessage="error"
                errorMessage={
                  errors.email && (
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  )
                }
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {/* <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )} */}
              <Input
                placeholder="Password"
                containerStyle={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 5,
                }}
                inputContainerStyle={{
                  width: "100%",
                  borderColor: "rgba(0, 0, 0, 0)",
                  borderRadius: 8,
                  backgroundColor: "rgb(241, 243, 244)",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                inputStyle={{
                  fontSize: 16,
                  fontWeight: "normal",
                  height: 50,
                }}
                errorStyle={{ color: "red" }}
                errorMessage={
                  errors.password && (
                    <Text style={{ color: "red" }}>{errors.password}</Text>
                  )
                }
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {/* <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry
              />
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )} */}
              <Text style={styles.linkText} onPress={handleForget}>
                Forget password? {""}
              </Text>
              <Button
                radius={"lg"}
                type="solid"
                onPress={handleSubmit}
                containerStyle={{
                  width: "100%",
                  paddingHorizontal: 10,
                }}
                buttonStyle={{
                  height: 50,
                }}
              >
                Log in{" "}
              </Button>
              <Text style={styles.linkTextNewuser} onPress={jumpSignup}>
                New user? Sign Up {""}
              </Text>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  linkText: {
    color: "blue",
    fontWeight: "normal",
    textDecorationLine: "underline",
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  containerMain: {
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  linkTextNewuser: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});

export default LoginPage;
