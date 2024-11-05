import {gql, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

const VOTE_MUTATION = gql`
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
`;

const DELTE_LINK_MUTATION = gql`
  mutation DeleteLinkMutation($linkId: ID!) {
    deleteLink(linkId: $linkId) {
      id
    }
  }
`;

const Link: React.FC<{
  id: string;
  description: string;
  authToken: string;
  votes?: any[];
  postedBy?: {name: string; id: string} | null;
  index: number;
}> = props => {
  // console.log(props);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    console.log('home rendered');
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
      linkId: props.id,
    },
    onCompleted: () => {
      console.log('Voted');
    },
  });

  const [deleteLink] = useMutation(DELTE_LINK_MUTATION, {
    variables: {
      linkId: props.id,
    },
    onCompleted: () => {
      console.log('Deleted');
    },
    onError: error => {
      console.log('Error Deleting Link', error);
    },
  });
  return (
    <View>
      <Text>{props.description}</Text>
      {props.authToken && <Button title="Upvote" onPress={() => vote()} />}
      {props.authToken && props.postedBy?.id === userId && (
        <Button title="Delete" onPress={() => deleteLink()} />
      )}
      <Text>
        {props?.votes ? props?.votes.length : 0} votes | by{' '}
        {props.postedBy ? props.postedBy.name : 'Unknown'}{' '}
      </Text>
    </View>
  );
};

export default Link;
