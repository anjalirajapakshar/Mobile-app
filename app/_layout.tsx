import { Button, TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Streamz from "@/components/Streamz";
import Login from "@/auth/Login";
import HomeScreen from "@/components/homescreen/HomeScreen";
import Stream from "@/components/stream/Stream";
import { RootStackParamList } from "@/assets/types/RootStackParamList";



const tamaguiConfig: any = createTamagui(config as never);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function _layout() {
  return (
    <NavigationContainer independent={true}>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack.Navigator >
          <Stack.Screen name="Streamz" component={Streamz} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation:"fade_from_bottom",headerShown:false}}/>
          <Stack.Screen name="Stream" component={Stream} options={{ animation:"fade_from_bottom",headerShown:false}}/>
          
        </Stack.Navigator>
      </TamaguiProvider>
    </NavigationContainer>
  );
}
