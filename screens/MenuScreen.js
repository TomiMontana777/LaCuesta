import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo de La Cuesta */}
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>!! Bienvenido a la Cuesta !!</Text>

        {/* Mesas */}
        <View style={styles.tableContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <TouchableOpacity key={index} style={styles.table}>
              <Text style={styles.tableText}>Mesa {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones del menú */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate('HamburguesasScreen')}
          >
            <Text style={styles.menuItem}>Hamburguesas</Text>
            <Text style={styles.menuSubItem}>Incluye papas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate('LomitosScreen')}
          >
            <Text style={styles.menuItem}>Lomitos</Text>
            <Text style={styles.menuSubItem}>Incluye papas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate('BebidasScreen')}
          >
            <Text style={styles.menuItem}>Bebidas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate('PizzasScreen')}
          >
            <Text style={styles.menuItem}>Pizzas</Text>
            <Text style={styles.menuSubItem}>Son ricas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigation.navigate('EmpanadasScreen')}
          >
            <Text style={styles.menuItem}>Empanadas</Text>
            <Text style={styles.menuSubItem}>CARNE, POLLO Y QUESO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0C0D15',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  table: {
    width: '48%',
    backgroundColor: '#D97C4B',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tableText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuContainer: {
    backgroundColor: '#D97C4B',
    borderRadius: 8,
    padding: 20,
  },
  menuItemContainer: {
    marginBottom: 20,
  },
  menuItem: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuSubItem: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});
