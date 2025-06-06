import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DeleteMovie = ({ route }) => {
  const movie = route.params?.movie || {
    id: '1',
    title: 'Película de ejemplo',
    description: 'Descripción de ejemplo',
    imageUrl: 'https://via.placeholder.com/300x450?text=No+Image'
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar "${movie.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => Alert.alert('Éxito', 'Película eliminada'),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Película</Text>
      
      <View style={styles.movieContainer}>
        <Image source={{ uri: movie.imageUrl }} style={styles.movieImage} />
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.movieDescription}>{movie.description}</Text>
      </View>

      <Text style={styles.warning}>
        <Icon name="warning-outline" size={20} color="#ff0000" />
        Esta acción no se puede deshacer
      </Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Confirmar Eliminación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFC300',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  movieContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  movieDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  warning: {
    color: '#ff0000',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteMovie;