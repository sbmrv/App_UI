import React from "react";
import { View, Text, TextInput } from "react-native";
import {
  Avatar,
  Header,
  Text as Textrne,
  Input,
  Button,
  Icon,
} from "@rneui/themed";
import { Linking, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import baseUrl from "../constants/config";

const SignupPage = ({ navigation, setUserData }) => {
  // const openDig = () => {};
  const handleLogin = async (values, actions) => {
    console.log(values);
    try {
      const response = await axios.post(
        `${baseUrl}/driver/driver_login`,
        values
      );
      if (response.data.error === false) {
        setUserData(response.data.driverData);
        navigation.navigate("Home");
      } else {
        return console.log(response.data.message);
      }
      console.log("Login success:", response.data.message);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignup = async (values) => {
    // Handle form submission here
    try {
      const response = await axios.post(
        `${baseUrl}/driver/driver_signup`,
        values
      );
      if (response.data.error) {
        console.log(response.data.message);
      }
      // setSaveDriverdata(response && response.data);
      // console.log("Submitted password:", password);
      // console.log(
      //   "login success",
      //   response.data.message,
      //   response.data.driverData
      // );
      if (response.data.error === false) {
        console.log(
          "signup success",
          response.data.message,
          response.data.driverData
        );
        jumpSignup();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleForget = () => {
    Linking.openURL("http://google.com");
  };
  const jumpSignup = () => {
    navigation.navigate("Login");
  };
  // Define Yup schema for validation
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    Cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  return (
    <View style={styles.containerMain}>
      <Textrne
        h3
        h3Style={{ fontSize: 24, fontWeight: "semibold", marginTop: 50 }}
        // style={{ marginBottom: 10, fontSize: 24, backgroundColor: "red" }}
      >
        Sign up for your account
      </Textrne>
      {/* <button onClick={openDig}>signUp here..</button> */}
      <View style={{ width: "100%" }}>
        {/* <Avatar
        size={32}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      /> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            Cpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ marginTop: 20 }}>
              <Input
                label="Full name"
                placeholder="Full name"
                containerStyle={{
                  width: "100%",
                  padding: 5,
                  marginTop: 20,
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
                  errors.Full_name && (
                    <Text style={{ color: "red" }}>{errors.Full_name}</Text>
                  )
                }
                onChangeText={handleChange("Full_name")}
                onBlur={handleBlur("Full_name")}
                value={values.Full_name}
              />
              <Input
                label="Email"
                placeholder="Email"
                containerStyle={{
                  width: "100%",
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
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  )
                }
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Input
                label="Password"
                placeholder="Password"
                rightIcon={<Icon name="eye" type="feather" size={20} />}
                containerStyle={{
                  width: "100%",
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
              <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                rightIcon={<Icon name="eye" type="feather" size={20} />}
                containerStyle={{
                  width: "100%",
                  padding: 5,
                  marginBottom: 40,
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
                onChangeText={handleChange("Cpassword")}
                onBlur={handleBlur("Cpassword")}
                value={values.Cpassword}
              />
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
                Create Admin Account{" "}
              </Button>
              <Text onPress={jumpSignup}>
                Please note that new signups are subject to approval by an
                existing admin. we'll notify you once your account is approved.{" "}
                {""}
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

export default SignupPage;
