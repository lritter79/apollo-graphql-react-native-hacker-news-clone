/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';


// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateLinkScreen from './screens/CreateLinkScreen';

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {


  return (
    <ApolloProvider client={client}>

    <NavigationContainer>
    <Stack.Navigator>
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
    </Stack.Navigator>

    </NavigationContainer>
    </ApolloProvider>

  );
}



export default App;
