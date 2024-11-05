import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  useColorScheme,
  Text,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from '../constants';
import {LinkList} from '../components/LinkList';

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    console.log('home rendered');
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

  const {data} = useQuery(FEED_QUERY);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const linksToRender = data ? data.feed.links : [];
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Home Screen</Text>
          {authToken && <Text>Logged in</Text>}
          <LinkList links={linksToRender} authToken={authToken} />
          {authToken && (
            <Button
              title="Go to Create a Link"
              onPress={() => navigation.navigate('CreateLink')}
            />
          )}
          {authToken && (
            <Button
              title="Logout"
              onPress={() => {
                AsyncStorage.clear();
                setAuthToken('');
              }}
            />
          )}
          {!authToken && (
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
