import axios from 'axios';
export async function fetchPopularTVShows(pageNumber:number) {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`,
        headers: {
          accept: 'application/json',
         Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_KEY}`
        }
      };
      
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
        
      }

}
