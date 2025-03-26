// Register.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Header, Form, Button, Message, Segment } from 'semantic-ui-react';
import './Register.css';

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
    <>
      {/* Hero Section */}
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: '80vh',
          padding: '4em 0em',
          background:
            'url("/Hecorbotrj.jpg") center center/cover no-repeat',
          backgroundSize:'contain',  
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        vertical
      >
        {/* Dark overlay */}
        <div className="register-overlay" />

        {/* Hero Content */}
        <Container text className="register-hero-content">
          <Header as="h1" inverted style={{ fontSize: '3em', marginBottom: '0.5em' }}>
            Register
          </Header>
          <Header as="h2" inverted style={{ fontSize: '1.5em', marginTop: '0.5em' }}>
            Join SHPEterview and start your journey!
          </Header>
        </Container>

        {/* Wave Transition */}
        <div className="wave-container">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,192L48,181.3C96,171,192,149,288,144C384,139,480,149,576,154.7C672,160,768,160,864,133.3C960,107,1056,53,1152,48C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </Segment>

      {/* Registration Form Section */}
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container text>
          <Header as="h2" textAlign="center">
            Create Your Account
          </Header>
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
            <Button type="submit" loading={loading} primary fluid style={{ marginTop: '1em' }}>
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
      </Segment>
    </>
  );
}
