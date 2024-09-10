import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    if (!phoneNumber || !password || !role) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.11:8080/api/users/create', {
        phoneNumber,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'User created successfully');
        navigation.navigate('Login'); // Navigate to login after successful sign-up
      } else {
        setError('Failed to create user');
      }
    } catch (error) {
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Role (e.g., ADMIN, USER)"
        value={role}
        onChangeText={setRole}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>

      <View style={styles.linkContainer}>
        <Text onPress={() => navigation.navigate('Login')} style={styles.linkText}>
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default Signup;
