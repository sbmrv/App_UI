import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Avatar } from "@rneui/themed";
import { Linking, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import baseUrl from "../constants/config";

// const web = "943395954248-6g1s35vde0nakl410j07h2ikoub3gi4r.apps.googleusercontent.com";
const HomePage = ({ userData }) => {
  return (
    <View style={styles.containerMain}>
      {userData && <Text>User Data: {JSON.stringify(userData)}</Text>}
      <Avatar
        size={32}
        rounded
        source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
      />
      <Text>LOGIN SUCCESSFULL WELCOME TO YOUR REACT NATIVE APPLICATION.</Text>
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
export default HomePage;
