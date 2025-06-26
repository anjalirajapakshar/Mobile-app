import React from "react";
import { View, Text } from "react-native";
import {LinearProgress } from "@rneui/themed";

const LinearProgressAPI: React.FunctionComponent = () => {
  return (
    <View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text>We're Logging you in...</Text>
        <LinearProgress style={{ marginVertical: 10 }} color="black" />
      </View>
    </View>
  );
};

export default LinearProgressAPI;
