import React from 'react';

export const LinkList: React.FC<{
  links: {
    description: string;
    authToken: string;
    votes?: any[];
    postedBy?: {name: string};
  }[];
}> = () => {
  return <div>LinkList</div>;
};
