import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,

} from "react-native-paper";


import Alert from "../components/toast/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FireBaseConfig";
import  { fetchUser,saveUser } from "../commonfunctions/HandleUser";
import UserType from "@/assets/types/UserType";
import LinearProgressBar from '@/components/progressbar/LinearProgressBar'

const Login = () => {
  const navigator = useNavigation();
  const [userData, setUserData] = useState<{ email: string; password: string }>({email: "",password: "",});
  const [isInvalidCredentials, setInvalidCredentialStatus] =useState<boolean>(false);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAlertVisible, setAlertVisibility] = useState<boolean>(true);
  const[errorMessage,setErrorMessage] = useState<string>('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 20,
      }}
    >
      {isInvalidCredentials ? (
        <Alert
          msg={errorMessage}
          icon={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-PHtrPswUuUhUtaFnWnklu7c2LqzPW6kJg&s"
          }
          visible={isAlertVisible}
          fun1={() => {
            setAlertVisibility(false);
          }}
          fun2={() => {}}
        />
      ) : null}
      
      <TextInput
        label="Email"
        mode={"outlined"}
        style={{
          margin: 20,
        }}
        onChange={(e) => {
          setUserData({ ...userData, email: e.nativeEvent.text });
        }}
      />
      <TextInput
        label="Password"
        mode={"outlined"}
        style={{
          margin: 20,
        }}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={toggleShowPassword}
          />
        }
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />

      <Button
        mode="contained"
        style={{
          margin: 20,
          backgroundColor: "black",
        }}
        onPress={async () => {
          setLoadingStatus(true);
              try {
                let fireBaseResponse = await signInWithEmailAndPassword(FIREBASE_AUTH,userData.email,userData.password)
                let response = await fetchUser(userData.email,userData.password);
                if (response?.data.isExists) {
                  let user: UserType = {
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    profilePic: response.data.data[0].profilePic,
                    favouriteList: response.data.data[0].favouriteList,
                    historyList: response.data.data[0].historyList,
                    watchLaterList: response.data.data[0].watchLaterList,
                  };

                  await AsyncStorage.setItem("isExistingUser", "true");
                  await AsyncStorage.setItem("user", JSON.stringify(user));
                  navigator.navigate("HomeScreen" as never);
                }else{
                  let newUser:UserType = {
                    name: fireBaseResponse.user.displayName as string || 'User',
                    email: fireBaseResponse.user.email as string,
                    profilePic: fireBaseResponse.user.photoURL as string,
                    favouriteList: [],
                    historyList: [],
                    watchLaterList: []
                  }
                  let newUserResponse = await saveUser(newUser);
                  console.log('New User Response : ',newUserResponse?.data);
                  if(newUserResponse?.data.isSaved){
                    await AsyncStorage.setItem("isExistingUser", "false");
                    await AsyncStorage.setItem("user", JSON.stringify(newUser));
                    navigator.navigate("HomeScreen" as never);
                  }

                }
              } catch (error: any) {
                setErrorMessage(error.message);
                setInvalidCredentialStatus(true);
                setAlertVisibility(true);
                console.log(
                  "Something went wrong while : ",error);
              } finally {
                setLoadingStatus(false);
              }
            
            
        }}
      >
        Login
      </Button>
      {isLoading ? <LinearProgressBar /> : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
