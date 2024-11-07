import {DocumentNode} from 'graphql';
import {gql} from './__generated__/gql';
import {TypedDocumentNode} from '@graphql-typed-document-node/core';
import {
  FeedQueryQuery,
  Exact,
  InputMaybe,
  Scalars,
  LinkOrderByInput,
} from './__generated__/graphql';

export const NEW_VOTES_SUBSCRIPTION = gql(`
    subscription NewVote {
      newVote {
        id
        link {
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
        user {
          id
        }
      }
    }
  `) as DocumentNode;

export const FEED_QUERY = gql(`
    query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
      feed(take: $take, skip: $skip, orderBy: $orderBy) {
        id
        links {
          id
          createdAt
          url
          description
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
        count
      }
    }
  `) as TypedDocumentNode<
  FeedQueryQuery,
  Exact<{
    take?: InputMaybe<Scalars['Int']['input']>;
    skip?: InputMaybe<Scalars['Int']['input']>;
    orderBy?: InputMaybe<LinkOrderByInput>;
  }>
>;
