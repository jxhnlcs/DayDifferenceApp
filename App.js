import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [difference, setDifference] = useState('');
  const [error, setError] = useState('');

  const formatDateString = (inputDate) => {
    let formattedDate = inputDate;
    if (formattedDate.length === 2 || formattedDate.length === 5) {
      formattedDate += '/';
    }
    return formattedDate.slice(0, 10);
  };

  const handleDate1Change = (text) => {
    setDate1(formatDateString(text));
  };

  const handleDate2Change = (text) => {
    setDate2(formatDateString(text));
  };

  const calculateDifference = () => {
    if (!date1 || !date2) {
      setError('Preencha os campos de data');
      return;
    }

    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date1) || !regex.test(date2)) {
      setError('Use apenas números para a data');
      return;
    }

    setError('');

    const [day1, month1, year1] = date1.split('/');
    const [day2, month2, year2] = date2.split('/');

    const date1Obj = new Date(year1, month1 - 1, day1);
    const date2Obj = new Date(year2, month2 - 1, day2);

    const timeDifference = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDifference(differenceInDays.toString());
  };

  const clearFields = () => {
    setDate1('');
    setDate2('');
    setDifference('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Diferença de Dias</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a primeira data"
        placeholderTextColor="#ccc"
        value={date1}
        onChangeText={handleDate1Change}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a segunda data"
        placeholderTextColor="#ccc"
        value={date2}
        onChangeText={handleDate2Change}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={calculateDifference}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={clearFields}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.result}>
        Diferença em dias: {difference}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
