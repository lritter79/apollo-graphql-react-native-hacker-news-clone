import React from 'react';
import {Text} from 'react-native';

const Link: React.FC<{
  description: string;
  authToken?: string | null;
  votes?: any[];
  postedBy?: {name: string};
}> = props => {
  return <Text>{props.description}</Text>;
};

export default Link;
