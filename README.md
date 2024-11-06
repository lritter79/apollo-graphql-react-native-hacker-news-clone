# React Native Apollo GraphQL Project

This project is a React Native application that uses Apollo Client to interact with a GraphQL API. It's based on this [tutorial](https://www.howtographql.com/react-apollo/0-introduction/), but with React swapped out for React Native.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/reactNativeApolloGraphql.git
   ```
2. Navigate to the project directory:
   ```sh
   cd reactNativeApolloGraphql
   ```
3. Install the dependencies for the react-native app:
   ```sh
   npm install
   ```
4. Install the dependencies for the node backend locally
   ```sh
   cd server
   npm install
   ```

## Usage for iOS

1. Start the node development server:
   ```sh
   cd server
   npm run dev
   ```
2. In root directory run the application on iOS (assuming you have your iOS dev environemt set up):
   ```sh
   npx react-native run-ios
   ```

## Features

- Integration with Apollo Client for GraphQL queries and mutations
- React Native components and navigation
- State management with Apollo Client cache

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
