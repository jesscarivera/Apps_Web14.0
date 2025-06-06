import React from 'react';
import { 
  NavigationContainer, 
  DefaultTheme 
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import MovieDetails from '../screens/MovieDetails';
import AddMovie from '../screens/AddMovie';
import EditMovie from '../screens/EditMovie';
import DeleteMovie from '../screens/DeleteMovie';
import Favorites from '../screens/Favorites'; 
import UpcomingMovies from '../screens/UpcomingMovies'; 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerTheme = {
  drawerStyle: {
    backgroundColor: '#FFC300',
  },
  drawerActiveTintColor: '#000',
  drawerInactiveTintColor: '#000',
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: '#FFC300',
  },
  headerTintColor: '#000',
};

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFC300',
  },
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home" 
      screenOptions={drawerTheme}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agregar"
        component={AddMovie}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Editar"
        component={EditMovie}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Eliminar"
        component={DeleteMovie}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="trash-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
       name="UpcomingMovies"
       component={UpcomingMovies}
       options={{
         title: 'Próximos Estrenos',
         drawerIcon: ({ color, size }) => (
           <Icon name="film-outline" size={size} color={color} />
          ),
        }}
     />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Drawer" 
          component={DrawerNavigator} 
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetails}
          options={{ 
            headerShown: true,
            headerTitle: 'Detalles de Película',
            headerStyle: {
              backgroundColor: '#FFC300',
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={Favorites} 
          options={{
            headerShown: true,
            headerTitle: 'Favoritos',
            headerStyle: {
              backgroundColor: '#FFC300',
            },
            headerTintColor: '#000',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
