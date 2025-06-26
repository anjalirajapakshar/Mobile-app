import MovieType from "./MovieType";
import TVShowType from "./TVShowTypes";

export type RootStackParamList = {
    Home: undefined; 
    Stream: { data: MovieType | TVShowType };
    Streamz : undefined;
    Sriflix: undefined;
    Login: undefined;
    HomeScreen: undefined;
};