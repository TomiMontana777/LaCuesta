import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default function DetallePedidoScreen() {
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [hamburguesas, setHamburguesas] = useState([]);
  const navigation = useNavigation();

  // Cargar los detalles de pedido y las hamburguesas desde Firebase
  useEffect(() => {
    const fetchDetallesPedido = async () => {
      try {
        const detallesCollection = await getDocs(collection(db, 'detalles_pedido'));
        const detallesList = detallesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDetallesPedido(detallesList);
      } catch (error) {
        console.error("Error al obtener los detalles del pedido", error);
      }
    };
    
    const fetchHamburguesas = async () => {
      try {
        const hamburguesasCollection = await getDocs(collection(db, 'hamburguesas'));
        const hamburguesasList = hamburguesasCollection.docs.map(doc => doc.data().nombre);
        setHamburguesas(hamburguesasList);
      } catch (error) {
        console.error("Error al obtener las hamburguesas", error);
      }
    };

    fetchDetallesPedido();
    fetchHamburguesas();
  }, []);

  // Función para eliminar un ítem de comida
  const eliminarItem = async (itemId) => {
    try {
      const itemRef = doc(db, 'detalles_pedido', itemId);
      await deleteDoc(itemRef);

      // Actualiza el estado local después de eliminar el ítem
      setDetallesPedido(detallesPedido.filter((item) => item.id !== itemId));
      alert("Comida eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar el ítem: ", error);
      alert("No se pudo eliminar el ítem. Inténtalo nuevamente.");
    }
  };

  // Función para redirigir al menú y pasar el pedido actual
  const agregarMasComida = () => {
    navigation.navigate('Menu', { detallesPedido });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalle de Pedido</Text>
      
      {detallesPedido.map((detalle) => (
        <View key={detalle.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>Mesa: {detalle.mesa}</Text>
          <Text style={styles.itemText}>Comida: 
            {detalle.items && Object.keys(detalle.items).length > 0 ? (
              Object.keys(detalle.items).map(item => {
                const nombreComida = nombresComidas[item] || item; // Usa el nombre si está disponible
                return `${nombreComida}: ${detalle.items[item]}`;
              }).join('')
            ) : (
              "No hay comida en este pedido."
            )}
          </Text>
          <Text style={styles.itemText}>Tiempo: {new Date(detalle.timestamp.seconds * 1000).toLocaleString()}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarItem(detalle.id)}
            >
              <Text style={styles.buttonText}>Eliminar Comida</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.addButton}
              onPress={agregarMasComida}
            >
              <Text style={styles.buttonText}>Agregar Más Comida</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
