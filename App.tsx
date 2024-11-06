/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';

import React, {useState, useEffect} from 'react';

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from '@apollo/client/link/context';

import HomeScreen from './screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateLinkScreen from './screens/CreateLinkScreen';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from './constants';
import {SearchScreen} from './screens/SearchScreen';
// 2

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem(AUTH_TOKEN);
        if (value !== null) {
          setAuthToken(value);
        }
      } catch (e) {
        console.log('Error reading value', e);
      }
    }
    fetchData();
  }, []);
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken,
      },
    },
  });

  const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  );

  // 3
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="CreateLink"
            component={CreateLinkScreen}
            options={{title: 'Create Link'}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{title: 'Search'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

// function HeaderLogo() {
//   return (
//     <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
//       <Text style={{color: 'white', padding: 5, fontSize: 22}}>Home</Text>
//     </View>
//   );
// }

export default App;
