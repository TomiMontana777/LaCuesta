import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';

export default function HamburguesasScreen({ navigation }) {
  const [notes, setNotes] = useState(''); // Para manejar las notas adicionales
  const [selectedItems, setSelectedItems] = useState({}); // Para manejar la cantidad de cada hamburguesa

  // Manejar el botón de confirmar
const handleConfirm = () => {
    console.log('Pedido confirmado:', selectedItems, 'Notas:', notes);
    // Aquí podrías procesar el pedido, enviarlo a una base de datos, etc.
};

return (
    <ScrollView contentContainerStyle={styles.container}>
    
      {/* Botón de volver */}
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>

      {/* Imagen de Hamburguesa */}
    <Image 
        source={require('../assets/images/hamburguesa.png')} // Asegúrate de tener esta imagen en tu directorio
        style={styles.hamburguesaImage} 
    />

      {/* Lista de Hamburguesas */}
    <Text style={styles.title}>Hamburguesas</Text>

    {[
        'Hamburguesa Simple',
        'Hamburguesa Doble',
        'Hamburguesa A la Cuesta',
        'Hamburguesa Doble Cheddar',
        'Hamburguesa Extra Papas',
        'Hamburguesa Doble Huevo'
    ].map((item, index) => (
        <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
        <View style={styles.counterContainer}>
            <TouchableOpacity
            onPress={() =>
                setSelectedItems({
                ...selectedItems,
                [item]: (selectedItems[item] || 0) + 1
                })
            }
            >
            <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>

            <Text style={styles.counterValue}>
            {selectedItems[item] ? selectedItems[item] : 0}
            </Text>

            <TouchableOpacity
            onPress={() =>
                setSelectedItems({
                ...selectedItems,
                [item]: Math.max((selectedItems[item] || 0) - 1, 0)
                })
            }
            >
            <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
        </View>
        </View>
    ))}

      {/* Campo para Notas Adicionales */}
    <TextInput
        style={styles.notesInput}
        placeholder="Notas adicionales para el pedido"
        value={notes}
        onChangeText={setNotes}
    />

      {/* Botón Confirmar */}
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
hamburguesaImage: {
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
