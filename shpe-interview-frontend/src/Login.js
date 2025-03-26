import React, { useState, useContext, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Segment, Card, Header, Form, Button, Message } from 'semantic-ui-react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login);
      navigate('/');
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ variables: { email, password } });
  };


  const pageStyle = {
    height: '100vh',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("/vro.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '50% auto',
    margin: 0,
    padding: 0,
  };
  

  const cardStyle = {
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  };

  return (
    <Segment basic vertical style={pageStyle}>
      <Card style={cardStyle}>
        <Card.Content>
          <Header as="h2" textAlign="center" style={{ marginBottom: '1em' }}>
            Login to Your Account
          </Header>
          <Form onSubmit={handleSubmit} error={!!errorMsg}>
            <Form.Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" primary fluid style={{ marginTop: '1em' }}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          {errorMsg && (
            <Message
              error
              header="Login Error"
              content={errorMsg}
              style={{ marginTop: '1em' }}
            />
          )}
        </Card.Content>
      </Card>
    </Segment>
  );
}
