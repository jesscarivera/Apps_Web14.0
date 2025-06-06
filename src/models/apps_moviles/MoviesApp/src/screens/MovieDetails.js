import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const MovieDetails = ({ route }) => {
  const { movie } = route.params || {};
  const movieData = movie || {
    title: 'Película no disponible',
    description: 'No se encontraron detalles',
    imageUrl: 'https://via.placeholder.com/300x450?text=No+Image',
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      setCommentsList([...commentsList, comment]);
      setComment('');
    }
  };

  return (
    <Animatable.View style={styles.container} animation="fadeIn" duration={1000}>
      <ScrollView>
        <Image source={{ uri: movieData.imageUrl }} style={styles.image} resizeMode="cover" />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movieData.title}</Text>

          <View style={styles.infoRow}>
            <Icon name="document-text-outline" size={20} color="#000" />
            <Text style={styles.description}>{movieData.description}</Text>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>

          {/* Calificación */}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
                <Icon
                  name={index < rating ? 'star' : 'star-outline'}
                  size={30}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>Calificación: {rating} / 5</Text>

          {/* Comentarios */}
          <TextInput
            style={styles.commentInput}
            placeholder="Escribe tu comentario..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={handleCommentSubmit} style={styles.editButton}>
            <Text style={styles.buttonText}>Enviar Comentario</Text>
          </TouchableOpacity>

          <FlatList
            data={commentsList}
            renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  commentInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  comment: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
});

export default MovieDetails;
