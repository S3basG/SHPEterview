import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Header, Segment, List, Message } from 'semantic-ui-react';
import './TestQuery.css'; // We'll define wave styling here

// Define the query; adjust the fields to match your backend schema
const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
    }
  }
`;

export default function TestQuery() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <>
      {/* Hero Section */}
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: '50vh',
          padding: '4em 0em',
          backgroundColor: '#1a1a1a', // Dark hero background
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 0,
        }}
        vertical
      >
        <Container text>
          <Header
            as="h1"
            inverted
            style={{
              fontSize: '3em',
              fontWeight: 'bold',
            }}
          >
            Test Query
          </Header>
          <Header
            as="h2"
            inverted
            style={{
              fontSize: '1.5em',
              fontWeight: 'normal',
              marginTop: '0.5em',
            }}
          >
            Fetching Users from GraphQL
          </Header>
        </Container>

        {/* Wave transition at the bottom of the hero */}
        <div className="wave-container">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,96L40,96C80,96,160,96,240,128C320,160,400,224,480,229.3C560,235,640,181,720,181.3C800,181,880,235,960,256C1040,277,1120,267,1200,256C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            />
          </svg>
        </div>
      </Segment>

      {/* Data Section */}
      <Segment style={{ padding: '2em 0em', marginTop: 0 }} vertical>
        <Container>
          {/* Loading State */}
          {loading && (
            <Message info>
              <Message.Header>Loading...</Message.Header>
              <p>Please wait while we fetch user data.</p>
            </Message>
          )}

          {/* Error State */}
          {error && (
            <Message negative>
              <Message.Header>Error:</Message.Header>
              <p>{error.message}</p>
            </Message>
          )}

          {/* Data Display */}
          {data && (
            <>
              <Header as="h2">Users</Header>
              {data.getUsers.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <List divided relaxed>
                  {data.getUsers.map((user) => (
                    <List.Item key={user.id}>
                      <List.Icon name="user" size="large" verticalAlign="middle" />
                      <List.Content>
                        <List.Header>{user.name}</List.Header>
                        <List.Description>{user.email}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              )}
            </>
          )}
        </Container>
      </Segment>
    </>
  );
}
