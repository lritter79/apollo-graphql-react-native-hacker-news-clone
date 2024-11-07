import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import {LinkList} from '../components/LinkList';
import {gql} from '../__generated__/gql';
const FEED_SEARCH_QUERY = gql(`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
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
  }
`);
export const SearchScreen = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, {data}] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <View>
      <Text>Search</Text>
      <TextInput
        value={searchFilter}
        placeholder="Search"
        onChange={(event: {nativeEvent: {text: any}}) =>
          setSearchFilter(event.nativeEvent.text)
        }
      />
      <Button
        title="Search"
        onPress={() =>
          executeSearch({
            variables: {filter: searchFilter},
          })
        }
      />
      {data && <LinkList links={data.feed.links} authToken={''} />}
    </View>
  );
};
