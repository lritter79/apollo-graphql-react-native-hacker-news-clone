import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, useColorScheme, Text, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Link from '../components/Link';
import { useQuery, gql } from '@apollo/client';


const HomeScreen = ({navigation}:{navigation:any}) => {
    const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
const { data } = useQuery(FEED_QUERY);

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
      {linksToRender.map((link:{description:string, id:string}) => (
        <Link key={link.id} {...link}/>
      ))}
    <Button
      title="Go to Create a Link"
      onPress={() =>
        navigation.navigate('CreateLink')
      }
    />
          </View>
      </ScrollView>
    </SafeAreaView>  );
};

export default HomeScreen;
