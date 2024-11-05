import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import {AUTH_TOKEN} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
        }
      }
    }
  `;
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onError: error => {
      console.log(error);
    },
    onCompleted: async ({login}) => {
      console.log(login);
      await AsyncStorage.setItem(AUTH_TOKEN, login.token);
      await AsyncStorage.setItem('user_id', login.user.id);
      navigation.navigate('Home');
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onError: error => {
      console.log(error);
    },
    onCompleted: async ({signup}) => {
      console.log(signup);
      await AsyncStorage.setItem(AUTH_TOKEN, signup.token);
      navigation.navigate('Home');
    },
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
            onChangeText={text =>
              setFormState({
                ...formState,
                name: text,
              })
            }
            placeholder="Your name"
          />
        )}
        <TextInput
          style={styles.input}
          value={formState.email}
          onChangeText={text =>
            setFormState({
              ...formState,
              email: text,
            })
          }
          placeholder="Your email address"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={formState.password}
          onChangeText={text =>
            setFormState({
              ...formState,
              password: text,
            })
          }
          placeholder="Choose a safe password"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => (formState.login ? login() : signup())}>
          <Text style={styles.buttonText}>
            {formState.login ? 'login' : 'create account'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }>
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
