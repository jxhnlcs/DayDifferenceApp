import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState('');

  const calculateDifference = () => {
    const [day1, month1, year1] = date1.split('/');
    const [day2, month2, year2] = date2.split('/');

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date(year2, month2 - 1, day2);

    const timeDifference = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDifference(differenceInDays.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Diferença de Dias</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a primeira data (dd/mm/aaaa)"
        value={date1}
        onChangeText={(text) => setDate1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a segunda data (dd/mm/aaaa)"
        value={date2}
        onChangeText={(text) => setDate2(text)}
      />
      <Button title="Calcular" onPress={calculateDifference} />
      <Text style={styles.result}>
        Diferença em dias: {difference}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
