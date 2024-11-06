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
const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
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
      user {
        id
      }
    }
  }
`;
const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
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
`;

const OLD_FEED_QUERY = gql`
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
      count
    }
  }
`;

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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
      count
    }
  }
`;

export const LINKS_PER_PAGE = 5;

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [authToken, setAuthToken] = useState('');
  const [page, setPage] = useState(0);

  const getQueryVariables = () => {
    const skip = page * LINKS_PER_PAGE;
    const take = LINKS_PER_PAGE;
    const orderBy = {createdAt: 'desc'};
    return {take, skip, orderBy};
  };
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

  const {data, loading, error, subscribeToMore} = useQuery(FEED_QUERY, {
    variables: getQueryVariables(),
  });
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({id}) => id === newLink.id);
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
