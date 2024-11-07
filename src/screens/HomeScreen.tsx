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
import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from '../constants';
import {LinkList} from '../components/LinkList';
import {Sort} from '../__generated__/graphql';
import {
  FEED_QUERY,
  // NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from '../data';
import {gql} from '../__generated__/gql';
export const NEW_LINKS_SUBSCRIPTION = gql(`
  subscription NewLink
  { 
    newLink {
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
  `);

export const LINKS_PER_PAGE = 5;

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [authToken, setAuthToken] = useState('');
  const [page, setPage] = useState(0);

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

  const {data, subscribeToMore} = useQuery(FEED_QUERY, {
    variables: {
      take: LINKS_PER_PAGE,
      skip: page * LINKS_PER_PAGE,
      orderBy: {createdAt: 'desc' as Sort},
    },
  });

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data?.newLink) {
        return prev;
      }
      const newLink = subscriptionData.data?.newLink;
      const exists = prev.feed.links.find(({id}) => id === newLink.id);
      // eslint-disable-next-line curly
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });
  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });
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
          <Button title="Next Page" onPress={() => setPage(page + 1)} />
          <Button
            title="Search"
            onPress={() => navigation.navigate('Search')}
          />
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
