import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function MenuScreen({ navigation }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tablesQuery = query(collection(db, 'mesas'), orderBy('mesa', 'asc'));
        const tablesSnapshot = await getDocs(tablesQuery);
        const tablesList = tablesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTables(tablesList);
      } catch (error) {
        console.error("Error al obtener las mesas", error);
      }
    };
    fetchTables();
  }, []);

  const selectTable = (tableId) => {
    setSelectedTable(tableId);
  };

  const navigateToCollection = (collectionName) => {
    if (!selectedTable) {
      alert("Seleccione una mesa primero");
      return;
    }
    const selectedTableData = tables.find(table => table.id === selectedTable);
    navigation.navigate(collectionName + 'Screen', { table: selectedTableData });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
        <Text style={styles.welcomeText}>!! Bienvenido a la Cuesta !!</Text>

        <View style={styles.tableContainer}>
          {tables.map(table => (
            <TouchableOpacity
              key={table.id}
              style={[
                styles.table,
                selectedTable === table.id && styles.selectedTable,
              ]}
              onPress={() => selectTable(table.id)}
            >
              <Text style={styles.tableText}>Mesa {table.mesa}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateToCollection('Hamburguesas')}
          >
            <Text style={styles.menuItem}>Hamburguesas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateToCollection('Lomitos')}
          >
            <Text style={styles.menuItem}>Lomitos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateToCollection('Pizzas')}
          >
            <Text style={styles.menuItem}>Pizzas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateToCollection('Bebidas')}
          >
            <Text style={styles.menuItem}>Bebidas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItemContainer}
            onPress={() => navigateToCollection('Empanadas')}
          >
            <Text style={styles.menuItem}>Empanadas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, backgroundColor: '#0C0D15', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 30 },
  logo: { width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center', marginBottom: 30 },
  welcomeText: { fontSize: 24, color: '#FFF', textAlign: 'center', marginBottom: 20 },
  tableContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
  table: { width: '48%', backgroundColor: '#D97C4B', padding: 20, marginBottom: 10, borderRadius: 8, alignItems: 'center' },
  tableText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  menuContainer: { backgroundColor: '#D97C4B', borderRadius: 8, padding: 20 },
  menuItemContainer: { marginBottom: 20 },
  menuItem: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  menuSubItem: { color: 'white', fontSize: 14, marginTop: 5 },
  selectedTable: { borderColor: 'yellow', borderWidth: 2 },
});
