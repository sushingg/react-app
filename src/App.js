import React from 'react';

import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Users from './users';
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


const App = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">React and GraphQL - Sample Application</a>
      </nav>
      <div>
        <Users />
      </div>
    </div>
  </ApolloProvider>
);

export default App;