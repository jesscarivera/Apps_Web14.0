import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditMovie = ({ route }) => {
  const movie = route.params?.movie || {
    id: '1',
    title: 'Película de ejemplo',
    description: 'Descripción de ejemplo',
    imageUrl: 'https://via.placeholder.com/300x450?text=No+Image'
  };

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [imageUrl, setImageUrl] = useState(movie.imageUrl);

  const handleSubmit = () => {
    if (title && description && imageUrl) {
      Alert.alert('Éxito', 'Cambios guardados correctamente');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Película</Text>
      
      {/* Los mismos campos que AddMovie pero con datos precargados */}
      <View style={styles.inputContainer}>
        <Icon name="film-outline" size={24} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="document-text-outline" size={24} color="#000" />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descripción"
          multiline
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="image-outline" size={24} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="URL de imagen"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholderTextColor="#666"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

// Reutilizamos los mismos estilos de AddMovie
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
    marginBottom: 30,
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFC300',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditMovie;