import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const navigation = useNavigation();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (movie) => {
    const isFavorite = favoriteMovies.some(fav => fav.id === movie.id);
    if (isFavorite) {
      setFavoriteMovies(favoriteMovies.filter(fav => fav.id !== movie.id));
    } else {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

  const movies = [
    {
      id: '1',
      title: 'Bratz Genie Magic',
      description: 'La genio adolescente Katia y su padre están trabajando con dos científicos',
      imageUrl: 'https://static.wikia.nocookie.net/doblaje/images/d/d5/Bratz_Pura_Mag%C3%ADa.jpg/revision/latest?cb=20100912023836&path-prefix=es',
    },
    {
      id: '2',
      title: 'Chucky 2',
      description: 'Desarrollándose dos años después de la primera película, la historia sigue a Chucky, el sanguinario muñeco asesino',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BNTJlMWFkOGEtMmZhZi00MTNhLWJhZjYtYjE3NjkyZmNhMzcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '3',
      title: 'Batman Begins',
      description: 'Tras el asesinato de sus padres, Bruce Wayne se entrena con una misteriosa organización y vuelve a Gotham para combatir el crimen',
      imageUrl: 'https://m.media-amazon.com/images/I/51f4B2SLAyL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: '4',
      title: 'Bratz Forever Diamondz',
      description: 'Cloe, Jade, Sasha y Yasmin regresan a una nueva aventura compitiendo en el programa de televisión America Rocks Fashion',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjg1NDg3ZDQtNzkxNS00NzhhLThmYjctYjI3OTYxNDA3NmQyXkEyXkFqcGc@._V1_.jpg',
    },
    {
      id: '5',
      title: 'Barbie y El Castillo de Diamantes',
      description: 'Barbie cuenta el cuento de hadas de dos mejores amigas',
      imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/d75b17217d97c7301d85122dda1fd58cc629b51b415e41d67bad8d208563c8a2.jpg',
    },
    {
      id: '6',
      title: 'Shrek 2',
      description: 'Shrek, nuestro ogro favorito',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMzNmNjQ1NmUtNzhiZS00YWE2LTg4N2ItZTA2ODdmOTMwOTQ1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    },
    {
      id: '7',
      title: 'El mapa de los instantes perfectos',
      description: 'Dos adolescentes quedan atrapados en un bucle temporal.',
      imageUrl: 'https://m.media-amazon.com/images/I/911ILAyrpHS._UF894,1000_QL80_.jpg',
    },
    {
      id: '8',
      title: 'Cuestion de tiempo',
      description: 'un joven con la capacidad de viajar en el tiempo que intenta cambiar su pasado con la esperanza de mejorar su futuro',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1psijn5LvlavVFmoxlxy1nc54XJivEY64PQ&s',
    },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const isFavorite = favoriteMovies.some(fav => fav.id === item.id);

    return (
      <View style={styles.movieCard}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MovieDetails', { movie: item })}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteIcon}>
          <Icon
            name={isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={isFavorite ? '#FFC300' : '#FFF'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Películas</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar película..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favorites', { favoriteMovies, toggleFavorite })}
      >
        <Text style={styles.buttonText}>Ver Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  list: {
    justifyContent: 'space-between',
  },
  movieCard: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    position: 'relative',
  },
  movieImage: {
    width: '100%',
    height: 150,
  },
  movieTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFC300',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFC300',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
