import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider } from './AuthContext'; // Ensure this is correctly imported

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL backend
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/', // Update if your backend endpoint is different
});

// Create a middleware to attach the token from localStorage
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client by combining the auth and http links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Render your app with ApolloProvider so that the client is available everywhere
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider> {/* Ensure AuthProvider wraps the App */}
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();