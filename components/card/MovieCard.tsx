import MovieType from '@/assets/types/MovieType';
import TVShowType from '@/assets/types/TVShowTypes';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/assets/types/RootStackParamList';

interface MovieCardProps {
  data: MovieType | TVShowType;
}


const MovieCard = ({ data:cardData }: MovieCardProps) => {
  type StreamProp = StackNavigationProp<RootStackParamList, 'Stream'>;
  const navigator = useNavigation<StreamProp>();
  
  return (
    <Card style={{
      width: 150,
      height : 300,
      margin: 10,
      borderRadius: 10,
      overflow: 'hidden',
    }}
    onPress={() => navigator.navigate('Stream', { data: cardData })}
    >
      
      <Text variant="displaySmall" style={{
        fontSize: 10,
        fontWeight: "bold",
        color: "black",
        padding: 10,
      }}>{(cardData as MovieType).title ? (cardData as MovieType).title : (cardData as TVShowType).name}</Text>
      <Card.Cover source={{ uri: cardData.poster_path }} />
      
    </Card>
  );
};

export default MovieCard;