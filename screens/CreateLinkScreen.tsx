import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

const CreateLinkScreen = () => {
    const [formState, setFormState] = useState({
        description: '',
        url: '',
      });  return (
    <View >
      <Text > Demo Form </Text>
      <View>
        <TextInput
                value={formState.url}
                        placeholder="URL"
                        onChange={(event) =>
                            setFormState({
                            ...formState,
                            url: event.nativeEvent.text,
                            })
                        } />

<TextInput
                value={formState.description}
                        placeholder="Description"
                        onChange={(event) =>
                            setFormState({
                            ...formState,
                            description: event.nativeEvent.text,
                            })
                        } />

      </View>
      <Button
title="click me"
onPress={() => console.log('you clicked a button')}
/>
    </View>
  );
};

export default CreateLinkScreen;
