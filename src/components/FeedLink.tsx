import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {gql} from '../__generated__/gql';
import {FEED_QUERY} from '../data';
const VOTE_MUTATION = gql(`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
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
`);

const DELTE_LINK_MUTATION = gql(`
  mutation DeleteLinkMutation($linkId: ID!) {
    deleteLink(linkId: $linkId) {
      id
    }
  }
`);

const FeedLink: React.FC<{
  link: {
    __typename?: 'Link';
    id: string;
    createdAt: any;
    url: string;
    description: string;
    postedBy?: {
      __typename?: 'User';
      id: string;
      name: string;
    } | null;
    votes: Array<{
      __typename?: 'Vote';
      id: string;
      user: {
        __typename?: 'User';
        id: string;
      };
    }>;
  };
  authToken: string;
}> = props => {
  const [userId, setUserId] = useState('');
  const {id, description, votes, postedBy} = props.link;
  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('user_id');
        if (value !== null) {
          setUserId(value);
        }
      } catch (e) {
        console.log('Error reading value', e);
      }
    }
    fetchData();
  }, []);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: id,
    },
    onCompleted: () => {
      console.log('Voted');
    },
    // update: (cache, {data: {vote}}) => {
    //   console.log('Voted', vote);
    //   const {feed} = cache.readQuery({
    //     query: FEED_QUERY,
    //   });

    //   const updatedLinks = feed.links.map(feedLink => {
    //     if (feedLink.id === props.id) {
    //       return {
    //         ...feedLink,
    //         votes: [...feedLink.votes, vote],
    //       };
    //     }
    //     return feedLink;
    //   });

    //   cache.writeQuery({
    //     query: FEED_QUERY,
    //     data: {
    //       feed: {
    //         links: updatedLinks,
    //       },
    //     },
    //   });
    // },
  });

  const [deleteLink] = useMutation(DELTE_LINK_MUTATION, {
    variables: {
      linkId: props.link.id,
    },
    onCompleted: () => {
      console.log('Deleted');
    },
    onError: error => {
      console.log('Error Deleting Link', error);
    },
    update: cache => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });
      const feed = data ? data.feed : {links: []};

      let newLinks = data ? data.feed.links.filter(link => link.id !== id) : [];

      cache.writeQuery({
        query: FEED_QUERY,
        data: {...data, feed: {...feed, links: newLinks}},
      });
    },
  });
  return (
    <View>
      <Text>{description}</Text>
      {props.authToken && <Button title="▲ Upvote" onPress={() => vote()} />}
      {props.authToken && postedBy?.id === userId && (
        <Button title="Delete" onPress={() => deleteLink()} />
      )}
      <Text>
        {votes ? votes.length : 0} votes | by{' '}
        {postedBy ? postedBy.name : 'Unknown'}{' '}
      </Text>
    </View>
  );
};

export default FeedLink;
