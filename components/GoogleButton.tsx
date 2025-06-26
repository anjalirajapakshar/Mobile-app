import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import Svg, { Path } from "react-native-svg";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import TypeWriter from "react-native-typewriter";

const loadFonts = () => {
  return Font.loadAsync({
    TiltWarp: require("../assets/fonts/TiltWarp-Regular.ttf"),
  });
};

loadFonts();

const GoogleButton = () => {
  const navigation = useNavigation();
  const GoogleIcon = () => (
    <Svg viewBox="0 0 48 48" width="24" height="24">
      <Path
        fill="#4285F4"
        d="M24 9.5c3.8 0 6.3 1.6 7.7 2.9l5.8-5.7C33.6 3.7 29.4 2 24 2 14.7 2 7.2 7.5 4 15.3l6.8 5.3c1.8-5.5 7-9.6 13.2-9.6z"
      />
      <Path
        fill="#34A853"
        d="M46.2 24.5c0-1.5-.1-3-.3-4.4H24v8.4h12.5c-.5 2.6-2.1 4.8-4.4 6.3l6.8 5.3c3.9-3.5 6.3-8.7 6.3-15.6z"
      />
      <Path
        fill="#FBBC05"
        d="M10.8 29.6c-1-2.6-1.6-5.5-1.6-8.6s.6-6 1.6-8.6L4 15.3c-2.1 4.1-3.2 8.7-3.2 13.7s1.2 9.6 3.2 13.7l6.8-5.3z"
      />
      <Path
        fill="#EA4335"
        d="M24 47c6.4 0 11.8-2.1 15.8-5.7l-6.8-5.3c-2.1 1.4-4.7 2.3-7.7 2.3-6.1 0-11.2-4.1-13.1-9.6l-6.8 5.3C7.2 40.5 14.7 47 24 47z"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <TypeWriter style={styles.headerText} typing={1}>
        STREAMZ
      </TypeWriter>
      <Text style={styles.paragraphText}>
        Streamz is a free and open-source streaming platform that allows you to
        watch movies and TV shows.
      </Text>
      <Button
        icon={<GoogleIcon />}
        title="Continue with Google"
        buttonStyle={styles.button}
        titleStyle={styles.title}
        onPress={() => {
          navigation.navigate("Login" as never);
        }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "TiltWarp",
  },
  paragraphText: {
    fontSize: 12,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "TiltWarp",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "TiltWarp",
  },
});

export default GoogleButton;
