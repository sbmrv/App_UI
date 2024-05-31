import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Linking, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import baseUrl from "../constants/config";
import { Avatar, Header, Text as Textrne, Input, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const web = "943395954248-6g1s35vde0nakl410j07h2ikoub3gi4r.apps.googleusercontent.com";
const HomePage = ({ navigation, userData }) => {
  const [tokenGot, setToken] = useState(null);
  const [allTodo, setallTodo] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  const handleEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditingTodoText(todo.todo);
    updateTodo(todo._id, todo.todo);
  };

  const validationSchema = yup.object().shape({
    todo: yup.string().required(),
  });

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("adminToken");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      onLogout();
      return null; // Handle retrieval errors
    }
  };
  const fetchToken = async () => {
    const retrievedToken = await retrieveToken();
    setToken(retrievedToken);
  };
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("adminToken");
      fetchToken();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };
  const fetchAllTodos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/driver/getallTodo`, {
        headers: {
          token: tokenGot,
        },
      });
      if (response.data.error) {
        return console.log(response.data.message);
      }
      if (response.data.error === false) {
        setallTodo(response.data.allTodo);
        console.log("allTodos fetched successfully", response.data);
      }
    } catch (error) {
      console.error("Error fetching all todos:", error);
    }
  };
  const createTodo = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/driver/createTodo`,
        { todo: values.todo },
        {
          headers: {
            token: tokenGot,
          },
        }
      );
      if (response.data.error) {
        return console.log(response.data.message);
      }
      if (response.data.error === false) {
        fetchAllTodos(tokenGot);
        console.log("allTodos fetched successfully", response.data);
        resetForm();
      }
    } catch (error) {
      console.error("Error fetching all todos:", error);
    }
  };
  const updateTodo = async (todo_id, todoText) => {
    try {
      const response = await axios.post(
        `${baseUrl}/driver/updateTodo`,
        { todo: editingTodoText },
        {
          headers: {
            token: tokenGot,
          },
          params: {
            todo_id: todo_id,
          },
        }
      );
      if (response.data.error) {
        return console.log(response.data.message);
      }
      fetchAllTodos();
      if (response.data.error === false) {
        fetchAllTodos();
        console.log("Todo updated successfully", response.data);
        // resetForm();
        const updatedTodo = response.data.createdTodo;
        setallTodo(
          allTodo &&
            allTodo.map((todo) =>
              todo && todo._id === updatedTodo._id ? updatedTodo : todo
            )
        );
        setEditingTodoId(null);
        setEditingTodoText("");
      }
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };
  const handleKeyPress = (e, todo_id) => {
    if (e.key === "Enter") {
      handleUpdate(todo_id, editingTodoText);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.get(`${baseUrl}/driver/deleteTodo`, {
        headers: {
          token: tokenGot,
        },
        params: {
          todo_id: todoId,
        },
      });
      if (response.data.error) {
        return console.log(response.data.message);
      }
      if (response.data.error === false) {
        fetchAllTodos(tokenGot);
        console.log("Todo deleted successfully", response.data);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  useEffect(() => {
    const initialize = async () => {
      await fetchToken();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (tokenGot) {
      fetchAllTodos(tokenGot);
    }
  }, [tokenGot]);
  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      {editingTodoId === item._id ? (
        <TextInput
          style={styles.textInput}
          value={editingTodoText}
          onChangeText={setEditingTodoText}
          onBlur={() => setEditingTodoId(null)} // Cancel edit on blur
          onKeyPress={(e) => handleKeyPress(e, item._id)}
        />
      ) : (
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.todoText}>{item.todo}</Text>
          {/* <button onClick={deleteTodo}> del</button> */}
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <View style={styles.containerMain}>
      <View style={styles.container}>
        <Textrne h4 style={{ marginBottom: 40 }}>
          To-do list
        </Textrne>
        {/* {<Text>User Data: {JSON.stringify(userData)}</Text>} */}
        {/* <Textrne h4>{userData && <Text> Name: {userData.name}</Text>}</Textrne>
        <Textrne h4>
          {userData && <Text> Email: {userData.email}</Text>}{" "}
          <Text>{tokenGot}</Text>
        </Textrne> */}
        <View style={styles.todoListContainer}>
          <FlatList
            style={{ maxHeight: 300 }}
            data={allTodo}
            renderItem={renderTodoItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Formik
          initialValues={{ todo: "" }}
          validationSchema={validationSchema}
          onSubmit={createTodo}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ marginTop: 20 }}>
              <Input
                placeholder="todo"
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
                  errors.todo && (
                    <Text style={{ color: "red" }}>{errors.todo}</Text>
                  )
                }
                onChangeText={handleChange("todo")}
                onBlur={handleBlur("todo")}
                value={values.todo}
              />
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
                Add Todo{" "}
              </Button>
            </View>
          )}
        </Formik>
      </View>
      <Button onPress={onLogout}> logout</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  todoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    // backgroundColor: "red",
    // borderBottomColor: "#ccc",
  },
  todoItem: {
    fontSize: 18,
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoListContainer: {
    width: "100%",
    height: 200,
  },
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
  linkTextNewuser: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
export default HomePage;
