import React, { useEffect, useState } from "react";
import {StyleSheet,ScrollView,ImageBackground,Text,View,} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "@/assets/types/RootStackParamList";
import Genres from "@/assets/genres/genres.json";
import { Chip } from "react-native-paper";
import { WebView } from "react-native-webview";


type StreamRouteProp = RouteProp<RootStackParamList, "Stream">;

const Stream = ({ route }: { route: StreamRouteProp }) => {
  const { data } = route.params;
  const [genres, setGenres] = useState<string[]>([]);
  const [isPlayed, setPlayStatus] = useState<boolean>(false);
  const navigator = useNavigation();

  useEffect(() => {
    const genreArray: string[] = [];
    if (data.genre_ids) {
      data.genre_ids.map((id: number) => {
        Genres.genres.map((genre) => {
          if (genre.id === id) {
            genreArray.push(genre.name);
          }
        });
      });
      setGenres(genreArray);
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {

          isPlayed?
          <> 
          <WebView
          source={{
            uri: `${(process.env.EXPO_PUBLIC_MOVIE_STREAMING_URL ?? "").trim()}${
              data.id
            }`,
          }}
          startInLoadingState={true}
          scalesPageToFit={true}
          style={{
            marginTop: 200,
            width: 400,
            height: 400,
          }}
        />  
        <Button
        mode="contained"
        style={{
          backgroundColor: "black",
          margin: 10,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
        }}

        onPress={() => {
          navigator.navigate("HomeScreen" as never);
          
        }}
      >
        Back to home
      </Button>

        
        </>
        
        : <>
        <ImageBackground
        source={{ uri: data.poster_path }}
        style={{ width: "100%", height: 500 }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          margin: 5,
          color: "black",
        }}
      >
        {data.title}
      </Text>
      <Text style={{ margin: 2 }}>{data.release_date}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {genres.map((genre) => (
          <Chip
            selectedColor="black"
            rippleColor={"black"}
            style={{ margin: 5 }}
          >
            {genre}
          </Chip>
        ))}
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "300",
          padding: 30,
        }}
      >
        {data.overview}
      </Text>
      <Button
        mode="contained"
        style={{
          backgroundColor: "black",
          width: 80,
          margin: 10,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
        }}

        onPress={() => {
          setPlayStatus(true);
        }}
      >
        Play
      </Button>

        </>

      }
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Stream;
