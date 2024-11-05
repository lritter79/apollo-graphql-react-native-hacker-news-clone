import React from 'react';
import {View} from 'react-native';
import Link from './Link';

export const LinkList: React.FC<{
  authToken: string;
  links: {
    id: string;
    description: string;
    authToken: string;
    votes?: any[];
    postedBy?: {name: string} | null;
  }[];
}> = ({links, authToken}) => {
  console.log(links);
  return (
    <View>
      {links.map((link, index) => (
        <Link key={link.id} {...{...link, authToken, index}} />
      ))}
    </View>
  );
};
