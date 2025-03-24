// Register.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// Import Semantic UI components
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      alert(`User ${data.register.name} registered successfully!`);
      navigate('/login');
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: { name, email, password } });
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">Register</Header>
      <Form onSubmit={handleSubmit} error={!!errorMsg}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>

      {errorMsg && (
        <Message
          error
          header="Registration Error"
          content={errorMsg}
          style={{ marginTop: '1em' }}
        />
      )}
    </Container>
  );
}
