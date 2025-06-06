import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (title && description && imageUrl) {
      Alert.alert('Éxito', 'Película agregada correctamente');
      // Limpiar formulario
      setTitle('');
      setDescription('');
      setImageUrl('');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Película</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="film-outline" size={24} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Título de la película"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="document-text-outline" size={24} color="#000" />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descripción"
          placeholderTextColor="#666"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="image-outline" size={24} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="URL de la imagen"
          placeholderTextColor="#666"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Agregar Película</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFC300', // Amarillo
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000', // Negro
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Blanco
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#000', // Negro
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000', // Negro
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFC300', // Amarillo
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddMovie;