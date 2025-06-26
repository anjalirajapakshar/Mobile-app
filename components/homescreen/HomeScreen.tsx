import UserType from "@/assets/types/UserType";
import { fetchPopular } from "@/tmdb/FetchMovies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import MovieType from "@/assets/types/MovieType";
import MovieCard from "@/components/card/MovieCard";
import { Text } from "react-native-paper";
import * as Font from "expo-font";
import { DrawerComponent } from "../drawer/DrawerComponent";
import { Spinner } from "tamagui";
import { fetchPopularTVShows } from "@/tmdb/FetchNowPlaying";
import TVShowType from "@/assets/types/TVShowTypes";
import { Skeleton } from '@rneui/themed';






const HomeScreen = () => {
  const [isEndReachedOnMovies, setIsEndReachedOnMovies] = useState(false);
  const [isEndReachedOnTVShows, setIsEndReachedOnTVShows] = useState(false);
  const[popularMoviePageNumber,setPopularMoviePageNumber]=useState<number>(1);
  const[tvShowPageNumber,setTVShowPageNumber]=useState<number>(1);

  
  const loadFonts = () => {
    return Font.loadAsync({
      TiltWarp: require("../../assets/fonts/TiltWarp-Regular.ttf"),
    });
  };

  loadFonts();

  const handleScrollOnPopularMovies = (event:any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width - 20; // 20 is a buffer value
    setIsEndReachedOnMovies(isEnd);
    if (isEnd) {
      setPopularMoviePageNumber(popularMoviePageNumber+1);
    }
  };

  const handleScrollOnPopularTVShows = (event:any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width - 20; // 20 is a buffer value
    setIsEndReachedOnTVShows(isEnd);
    if (isEnd) {
      setTVShowPageNumber(tvShowPageNumber+1);
    }
  };
  
  const [user, setUserData] = useState<UserType>(null as never);
  const [popularMovieData, setPopularMovieData] = useState<MovieType[]>([]);
  const [popularTVShowData, setPopularTVShowData] = useState<TVShowType[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setUserData(JSON.parse(user));
        }
      } catch (error) {
        console.log("Something went wrong : ", error);
      }
    };
    const fetchPopularMovies = async () => {
      let movieArray: MovieType[] = [];
      let movieData = await fetchPopular(popularMoviePageNumber);
      movieData.results.forEach((movie: MovieType) => {
        let movieInfo: MovieType = {
          id: movie.id,
          title: movie.title,
          poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
        };

        movieArray.push(movieInfo);
      });
      setPopularMovieData(movieArray);
      isEndReachedOnMovies && setIsEndReachedOnMovies(false);
      setIsLoading(false);
    };
    const fetchPopluarTVShows = async () => {
      let tvShowArray: TVShowType[] = [];
      let tvShowData = await fetchPopularTVShows(tvShowPageNumber);
      tvShowData.results.forEach((tvShow: TVShowType) => {
        let tvShowInfo:TVShowType={
          id:tvShow.id,
          name:tvShow.name,
          poster_path:`https://image.tmdb.org/t/p/original${tvShow.poster_path}`,
          overview:tvShow.overview,
          first_air_date:tvShow.first_air_date,
          vote_average:tvShow.vote_average,
          genre_ids:tvShow.genre_ids 
        }

        tvShowArray.push(tvShowInfo);
      });
      setPopularTVShowData(tvShowArray);
      console.log(`Popular TV Show Data ${tvShowPageNumber}: `,tvShowArray);
      isEndReachedOnTVShows && setIsEndReachedOnTVShows(false);
      setIsLoading(false);
    };
    fetchUser();
    fetchPopularMovies();
    fetchPopluarTVShows();
  }, [popularMoviePageNumber,tvShowPageNumber]);

  return (
    <ScrollView>
      <DrawerComponent  name={""} profilePic={""}/>
      <Text variant="displayLarge" style={{
        marginLeft:15,
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        fontFamily:"TiltWarp",
      }}>Popular Movies</Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScrollOnPopularMovies}
        scrollEventThrottle={16}
      >
        {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={300} width={150} style={{ borderRadius: 10, margin: 10 }} />
        ))
      ) : (
        popularMovieData.map((movie: MovieType) => (
          <MovieCard key={movie.id} data={movie} />
        ))
      )}
      </ScrollView>
      {isEndReachedOnMovies ? <Spinner size="large" color="$orange10" /> : null}
      {isEndReachedOnTVShows ? <Spinner size="large" color="red" /> : null}
      <Text variant="displayLarge" style={{
        marginLeft:15,
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        fontFamily:"TiltWarp",
      }}>Popular TV Shows</Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScrollOnPopularTVShows}
        scrollEventThrottle={16}
      >
        {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={300} width={150} style={{ borderRadius: 10, margin: 10 }} />
        ))
      ) : (
        popularTVShowData.map((tvShow: TVShowType) => (
          <MovieCard key={tvShow.id} data={tvShow} />
        ))
      )}
      </ScrollView>
      
    </ScrollView  >
  );
};


export default HomeScreen;
