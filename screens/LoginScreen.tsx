import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {formState.login ? 'Login' : 'Sign Up'}
      </Text>
      <View style={styles.inputContainer}>
        {!formState.login && (
          <TextInput
            style={styles.input}
            value={formState.name}
            onChangeText={(text) =>
              setFormState({
                ...formState,
                name: text
              })
            }
            placeholder="Your name"
          />
        )}
        <TextInput
          style={styles.input}
          value={formState.email}
          onChangeText={(text) =>
            setFormState({
              ...formState,
              email: text
            })
          }
          placeholder="Your email address"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={formState.password}
          onChangeText={(text) =>
            setFormState({
              ...formState,
              password: text
            })
          }
          placeholder="Choose a safe password"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('onClick')}
        >
          <Text style={styles.buttonText}>
            {formState.login ? 'login' : 'create account'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          <Text style={styles.buttonText}>
            {formState.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
