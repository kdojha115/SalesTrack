// import { View, Text, TouchableOpacity, Image } from 'react-native'
// import React from 'react'
// import { darkGreen } from '../Components/Constants'
// import Btn from '../Components/Btn'
// import google from '../../assets/image/google.png'


// export default function LoginScreen(props) {
//   return (
//     <View>
//         {/* <Text>Log In</Text> */}
//         <View style={{marginHorizontal:30, marginTop:30}}>
//             <Btn textColor='white' bgColor={darkGreen}   btnLabel="Login" Press={() => props.navigation.navigate("CallDetails")} />
//             <View >
//                 <TouchableOpacity style={{backgroundColor: 'blue',
                     
//                     display: 'flex', flexDirection: 'row',
//                     alignItems: 'center', gap: 10,
//                     justifyContent: 'center',
//                     padding: 10, borderRadius:99,
//                     marginTop:25,

//                 }}>
//                     <Image source={google}
//                     style={{width:40,height:40}}/>
//                     <Text style={{fontSize:20, color: 'white',}}> Sign In with Google</Text>

//                 </TouchableOpacity>
//             </View>
//         </View>
//     </View>
//   )
// }


import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!phoneNumber || !password) {
      setError('Phone number and password are required');
      return;
    }

    try {
      // Fetch the user data from your API
      const response = await axios.get(`http://192.168.1.11:8080/api/users/${phoneNumber}`, {
        data: {
          password
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Navigate to the home page or another screen upon successful login
        Alert.alert('Success', 'User logged in successfully');
        navigation.navigate('CallDetails'); // Assuming you have a 'Home' screen to navigate to
      } else {
        setError('Invalid phone number or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid phone number or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.linkContainer}>
        <Text onPress={() => navigation.navigate('Signup')} style={styles.linkText}>
          Don't have an account? Sign up
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

export default LoginScreen;
