import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas
import HomeScreen from './screens/HomeScreen';

import MenuScreen from './screens/MenuScreen';

import HamburguesasScreen from './screens/HamburguesasScreen'

import LomitosScreen from './screens/LomitosScreen'

import BebidasScreen from './screens/BebidasScreen'

import EmpanadasScreen from './screens/EmpanadasScreen'

import PizzasScreen from './screens/PizzasScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="HamburguesasScreen" component={HamburguesasScreen} options={{ title: 'Hamburguesas' }} />
        <Stack.Screen name="LomitosScreen" component={LomitosScreen} options={{ title: 'Lomitos' }} />
        <Stack.Screen name="BebidasScreen" component={BebidasScreen} options={{ title: 'Bebidas' }} />
        <Stack.Screen name="EmpanadasScreen" component={EmpanadasScreen} options={{ title: 'Empanadas' }} />
        <Stack.Screen name="PizzasScreen" component={PizzasScreen} options={{ title: 'Pizza' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

