/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation VoteMutation($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n": types.VoteMutationDocument,
    "\n  mutation DeleteLinkMutation($linkId: ID!) {\n    deleteLink(linkId: $linkId) {\n      id\n    }\n  }\n": types.DeleteLinkMutationDocument,
    "\n    subscription NewVote {\n      newVote {\n        id\n        link {\n          id\n          url\n          description\n          createdAt\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        user {\n          id\n        }\n      }\n    }\n  ": types.NewVoteDocument,
    "\n    query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {\n      feed(take: $take, skip: $skip, orderBy: $orderBy) {\n        id\n        links {\n          id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        count\n      }\n    }\n  ": types.FeedQueryDocument,
    "\n    mutation PostMutation($description: String!, $url: String!) {\n      post(description: $description, url: $url) {\n        id\n        createdAt\n        url\n        description\n      }\n    }\n  ": types.PostMutationDocument,
    "\n  subscription NewLink\n  { \n    newLink {\n       id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n    }\n  }\n  ": types.NewLinkDocument,
    "\n    mutation SignupMutation(\n      $email: String!\n      $password: String!\n      $name: String!\n    ) {\n      signup(email: $email, password: $password, name: $name) {\n        token\n      }\n    }\n  ": types.SignupMutationDocument,
    "\n    mutation LoginMutation($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        user {\n          id\n        }\n      }\n    }\n  ": types.LoginMutationDocument,
    "\n  query FeedSearchQuery($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.FeedSearchQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VoteMutation($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation VoteMutation($linkId: ID!) {\n    vote(linkId: $linkId) {\n      id\n      link {\n        id\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteLinkMutation($linkId: ID!) {\n    deleteLink(linkId: $linkId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLinkMutation($linkId: ID!) {\n    deleteLink(linkId: $linkId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription NewVote {\n      newVote {\n        id\n        link {\n          id\n          url\n          description\n          createdAt\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        user {\n          id\n        }\n      }\n    }\n  "): (typeof documents)["\n    subscription NewVote {\n      newVote {\n        id\n        link {\n          id\n          url\n          description\n          createdAt\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        user {\n          id\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {\n      feed(take: $take, skip: $skip, orderBy: $orderBy) {\n        id\n        links {\n          id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        count\n      }\n    }\n  "): (typeof documents)["\n    query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {\n      feed(take: $take, skip: $skip, orderBy: $orderBy) {\n        id\n        links {\n          id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n        }\n        count\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation PostMutation($description: String!, $url: String!) {\n      post(description: $description, url: $url) {\n        id\n        createdAt\n        url\n        description\n      }\n    }\n  "): (typeof documents)["\n    mutation PostMutation($description: String!, $url: String!) {\n      post(description: $description, url: $url) {\n        id\n        createdAt\n        url\n        description\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription NewLink\n  { \n    newLink {\n       id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n    }\n  }\n  "): (typeof documents)["\n  subscription NewLink\n  { \n    newLink {\n       id\n          createdAt\n          url\n          description\n          postedBy {\n            id\n            name\n          }\n          votes {\n            id\n            user {\n              id\n            }\n          }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SignupMutation(\n      $email: String!\n      $password: String!\n      $name: String!\n    ) {\n      signup(email: $email, password: $password, name: $name) {\n        token\n      }\n    }\n  "): (typeof documents)["\n    mutation SignupMutation(\n      $email: String!\n      $password: String!\n      $name: String!\n    ) {\n      signup(email: $email, password: $password, name: $name) {\n        token\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LoginMutation($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        user {\n          id\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation LoginMutation($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        user {\n          id\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FeedSearchQuery($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FeedSearchQuery($filter: String!) {\n    feed(filter: $filter) {\n      id\n      links {\n        id\n        url\n        description\n        createdAt\n        postedBy {\n          id\n          name\n        }\n        votes {\n          id\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;