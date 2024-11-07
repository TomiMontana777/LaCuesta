import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function LomitosScreen({ route, navigation }) {
  const { table } = route.params; // Recibe la mesa seleccionada
  const [notes, setNotes] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [lomitos, setLomitos] = useState([]);

  useEffect(() => {
    const fetchLomitos = async () => {
      try {
        const lomitosCollection = await getDocs(collection(db, 'lomitos'));
        const lomitosList = lomitosCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLomitos(lomitosList);
      } catch (error) {
        console.error("Error al obtener los lomitos", error);
      }
    };
    fetchLomitos();
  }, []);

  const handleConfirm = async () => {
    try {
      const pedidoRef = await addDoc(collection(db, 'detalles_pedido'), {
        mesa: table.mesa, // Guarda el número de mesa
        items: selectedItems,
        notes,
        timestamp: new Date(),
      });
      
      setSelectedItems({});
      setNotes('');
      alert('Pedido de lomitos confirmado y guardado.');
      
      // Navega a la pantalla de Detalle de Pedido después de guardar
      navigation.navigate('DetalleScreen', { pedidoId: pedidoRef.id });
    } catch (error) {
      console.error("Error al guardar el pedido", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <Text style={styles.tableText}>Mesa seleccionada: {table.mesa}</Text>

      <Image 
        source={require('../assets/images/Lomito.png')} // Asegúrate de tener esta imagen en tu directorio
        style={styles.lomitoImage} 
      />

      <Text style={styles.title}>Lomitos</Text>

      {lomitos.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.nombre} - ${item.precio}</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() =>
                setSelectedItems({
                  ...selectedItems,
                  [item.id]: (selectedItems[item.id] || 0) + 1
                })
              }
            >
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>
              {selectedItems[item.id] ? selectedItems[item.id] : 0}
            </Text>

            <TouchableOpacity
              onPress={() =>
                setSelectedItems({
                  ...selectedItems,
                  [item.id]: Math.max((selectedItems[item.id] || 0) - 1, 0)
                })
              }
            >
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TextInput
        style={styles.notesInput}
        placeholder="Notas adicionales para el pedido"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0C0D15',
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#D97C4B',
    borderRadius: 8,
    padding: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lomitoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#D97C4B',
    padding: 10,
    borderRadius: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 10,
  },
  counterValue: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
  },
  notesInput: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
