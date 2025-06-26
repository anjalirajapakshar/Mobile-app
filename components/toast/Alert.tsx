import * as React from "react";
import { Image } from "react-native";
import { Banner } from "react-native-paper";
import * as Font from "expo-font";

interface AlertProps {
  visible: boolean;
  msg: string;
  icon: string;
  fun1: () => void;
  fun2: () => void;
}

const loadFonts = () => {
  return Font.loadAsync({
    TiltWarp: require("../../assets/fonts/TiltWarp-Regular.ttf"),
  });
};
loadFonts();

const Alert: React.FC<AlertProps> = ({ visible, msg, icon, fun1,fun2 }) => {
  return (
    <Banner
      theme={{animation: { scale: 1.0 }}}
      visible={visible}
      actions={[
        {
          label: "Close",
          onPress: fun1,
        },
        
      ]}
      icon={({ size }) => (
        <Image
          source={{
            uri: icon,
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    >
      {msg}
    </Banner>
  );
};

export default Alert;
