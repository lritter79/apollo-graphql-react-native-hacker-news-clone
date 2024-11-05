import React from 'react';
import {Button, Text, View} from 'react-native';

const Link: React.FC<{
  description: string;
  authToken: string;
  votes?: any[];
  postedBy?: {name: string};
}> = props => {
  console.log(props);

  return (
    <View>
      <Text>{props.description}</Text>
      {props.authToken && <Button title="Upvote" />}
      <Text>
        {' '}
        {props?.votes ? props?.votes.length : 0} votes | by{' '}
        {props.postedBy ? props.postedBy.name : 'Unknown'}{' '}
      </Text>
    </View>
  );
};

export default Link;
