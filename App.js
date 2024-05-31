import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
//
import React, { useState } from "react";
import { Button, Dialog, Snackbar, CheckBox, ListItem } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import axios from "axios";

//
import HomePage from "./components/HomePage";
import LoginPage from "./components/SigninPage";
import baseUrl from "./constants/config";
//
import StackNavigator from "./navigation/StackNavigator";
export default function App() {
  const [visible1, setVisible1] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //
  const [saveDriverdata, setSaveDriverdata] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  //
  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };
  const handleInputChange = (text) => {
    setUserName(text);
  };
  const handlepasswordChange = (text) => {
    setPassword(text);
  };
  const handleSubmit = async () => {
    // Handle form submission here
    try {
      const driverData = {
        email: userName,
        password: password,
      };
      const response = await axios.post(
        `${baseUrl}/driver/driver_signup`,
        driverData
      );
      if (response.data.error) {
        console.log(response.data.message);
      }
      setSaveDriverdata(response && response.data);
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
        toggleDialog1();
        setCreated(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const additionalProps = {
    ...(saveDriverdata &&
      saveDriverdata.driverData &&
      saveDriverdata.driverData.email && {
        email: saveDriverdata.driverData.email,
      }),
    ...(saveDriverdata &&
      saveDriverdata.driverData &&
      saveDriverdata.driverData.password && {
        password: saveDriverdata.driverData.password,
      }),
  };
  // return (
  //   <SafeAreaProvider>
  //     <View style={styles.containerMain}>
  //       {/* style={styles.container} */}
  //       <View style={styles.container}>
  //         <LoginPage title={String("Login")} />
  //       </View>
  //       {/* <HomePage {...additionalProps} /> */}
  //       {/* <SignupPage title={String("Create account")} /> */}
  //       {/* <Text>Open up App.js to start working on your app!</Text>
  //       <StatusBar style="auto" />
  //       <Button title="Solid" />
  //       <Button title="Outline" type="outline" />
  //       <Button title="Clear" type="clear" />
  //       <Avatar
  //         size={32}
  //         rounded
  //         source={{ uri: "https://randomuser.me/api/portraits/men/35.jpg" }}
  //       /> */}
  //       {/* <Button
  //         title="Open Simple Dialog"
  //         onPress={toggleDialog1}
  //         buttonStyle={styles.button}
  //       /> */}
  //       {/* <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
  //         <Dialog.Title title="Dialog Title" />
  //         <Text>Dialog body text. Add relevant information here.</Text>
  //       </Dialog> */}
  //       <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
  //         <Dialog.Title title="Dialog Title" />
  //         <Text>Dialog body text. Add relevant information here.</Text>
  //         <TextInput
  //           style={{
  //             height: 40,
  //             borderColor: "gray",
  //             borderWidth: 1,
  //             marginBottom: 10,
  //             paddingHorizontal: 10,
  //           }}
  //           placeholder="username"
  //           value={userName}
  //           onChangeText={handleInputChange}
  //         />
  //         <TextInput
  //           style={{
  //             height: 40,
  //             borderColor: "gray",
  //             borderWidth: 1,
  //             marginBottom: 10,
  //             paddingHorizontal: 10,
  //           }}
  //           placeholder="password"
  //           value={password}
  //           onChangeText={handlepasswordChange}
  //         />
  //         <Dialog.Actions>
  //           <Dialog.Button title="SignUp" onPress={handleSubmit} />
  //           <Dialog.Button
  //             title="cancel"
  //             onPress={() => {
  //               toggleDialog1(),
  //                 setUserName(""),
  //                 setPassword(""),
  //                 console.log("cancel Clicked!");
  //             }}
  //           />
  //         </Dialog.Actions>
  //       </Dialog>
  //       <Dialog isVisible={created} onBackdropPress={() => setCreated(false)}>
  //         <Dialog.Title title="Created Successfully!" />
  //         <Text>
  //           {saveDriverdata && saveDriverdata.message} for email:{" "}
  //           {saveDriverdata &&
  //             saveDriverdata.driverData &&
  //             saveDriverdata.driverData.email}{" "}
  //           and password::{" "}
  //           {saveDriverdata &&
  //             saveDriverdata.driverData &&
  //             saveDriverdata.driverData.password}
  //         </Text>
  //         <Dialog.Actions>
  //           <Dialog.Button
  //             title="Okay"
  //             onPress={() => {
  //               // toggleDialog1(),
  //               //   setUserName(""),
  //               //   setPassword(""),
  //               //   console.log("cancel Clicked!");
  //               setCreated(false);
  //             }}
  //           />
  //         </Dialog.Actions>
  //       </Dialog>
  //     </View>
  //   </SafeAreaProvider>
  // );
  return <StackNavigator />;
}
// openModal;
const styles = StyleSheet.create({
  containerMain: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgb(241, 243, 244)",
    alignItems: "center",
    paddingTop: 40,
  },
  container: {
    // flex: 1,
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
});
