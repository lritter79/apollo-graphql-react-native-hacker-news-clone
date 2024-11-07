import React from 'react';
import {View} from 'react-native';
import FeedLink from './FeedLink';
export const LinkList: React.FC<{
  authToken: string;
  links: {
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
  }[];
}> = ({links, authToken}) => {
  return (
    <View>
      {links.map(link => (
        <FeedLink key={link.id} link={link} authToken={authToken} />
      ))}
    </View>
  );
};
