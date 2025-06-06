import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Favorites = ({ route }) => {
  const { favoriteMovies, toggleFavorite } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      
      <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.trashIcon}>
        <Icon name="trash-outline" size={24} color="#FFC300" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Películas Favoritas</Text>

      {favoriteMovies.length === 0 ? (
        <Text style={styles.emptyText}>No tienes películas favoritas aún.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
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
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
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
  trashIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 4,
  },
});

export default Favorites;
