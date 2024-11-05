import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useMutation, gql} from '@apollo/client';

const CreateLinkScreen = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      'Create Link?',
      `Description: ${formState.description}
      URL: ${formState.url}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            createLink()
              .then(() => {
                console.log('Link Created');
              })
              .catch(error => {
                console.log('Error Creating Link', error);
              });
          },
        },
      ],
    );

  const CREATE_LINK_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        createdAt
        url
        description
      }
    }
  `;
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
  });
  return (
    <View>
      <Text> Demo Form </Text>
      <View>
        <TextInput
          value={formState.url}
          placeholder="URL"
          onChange={event =>
            setFormState({
              ...formState,
              url: event.nativeEvent.text,
            })
          }
        />

        <TextInput
          value={formState.description}
          placeholder="Description"
          onChange={event =>
            setFormState({
              ...formState,
              description: event.nativeEvent.text,
            })
          }
        />
      </View>
      <Button title="Create Link" onPress={() => createTwoButtonAlert()} />
    </View>
  );
};

export default CreateLinkScreen;
