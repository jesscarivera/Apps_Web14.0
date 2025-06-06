import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const upcomingMovies = [
  {
    id: '1',
    title: 'Bratz Fashion Pixiez',
    imageUrl: 'https://m.media-amazon.com/images/I/51ePd7d3XQL._AC_UF894,1000_QL80_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=qoJ7RUi7RW0',
  },
  {
    id: '2',
    title: 'Bratz rock angelz',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BM2E2MzhjMjItNDI0Yy00ZTQyLWIwYTItYzhkYjJlNzc2ZTkyXkEyXkFqcGc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=RcmFiVGr5nY',
  },
  {
    id: '3',
    title: 'Siempre en el mejor momento',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4oAg7FWNqWbsdzEJiftIgmt3n6log-RBEQ&s',
    trailerUrl: 'https://www.youtube.com/watch?v=V3jYeXkLSPk',
  },
  {
    id: '4',
    title: 'After aqui empieza todo',
    imageUrl: 'https://es.web.img3.acsta.net/pictures/19/01/16/12/25/3230288.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=5ZXzJJzVY-M',
  },
  {
    id: '5',
    title: 'La vida inmoral de la pareja ideal',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2Y3MDBkMzUtODNiNy00YTZiLTk5MDktMmYwN2E0ZDRlYzFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=_-eJgS0BILA',
  },
  {
    id: '6',
    title: 'Shrek',
    imageUrl: 'https://es.web.img3.acsta.net/pictures/14/03/06/10/13/369709.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=TMIsxOsuwNA',
  },
  {
    id: '7',
    title: 'Chucky',
    imageUrl: 'https://static.wikia.nocookie.net/doblaje/images/4/49/Chucky_El_Muneco_DiabolicoDVD.jpg/revision/latest?cb=20230729024722&path-prefix=es',
    trailerUrl: 'https://www.youtube.com/watch?v=qDbMsaJjp3c',
  },
  {
    id: '8',
    title: 'la niña de mis ojos',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU7dL7oDgQLbAzJj1X_8kXCz78iT-FzjUz4w&s',
    trailerUrl: 'https://www.youtube.com/watch?v=25_lj1RM7So',
  },
];

const UpcomingMovies = () => {
  const navigation = useNavigation();

  const openTrailer = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openTrailer(item.trailerUrl)} style={styles.trailerButton}>
        <Icon name="play-circle-outline" size={24} color="#FFC300" />
        <Text style={styles.trailerText}>Ver Trailer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Próximos Estrenos</Text>
      <FlatList
        data={upcomingMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    color: '#FFC300',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#000',
  },
  trailerText: {
    color: '#FFC300',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default UpcomingMovies;
