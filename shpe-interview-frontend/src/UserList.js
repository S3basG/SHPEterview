import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Header, List, Loader, Message, Segment } from 'semantic-ui-react';


const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
    }
  }
`;

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <>
      {/* Hero Section */}
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: '40vh',
          padding: '4em 0em',
          background:
            'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085") center center/cover no-repeat',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        vertical
      >
        {/* Dark overlay */}
        <div className="userlist-overlay" />
        <Container text>
          <Header as="h1" inverted style={{ fontSize: '3em', fontWeight: 'bold' }}>
            User List
          </Header>
          <Header as="h2" inverted style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: '0.5em' }}>
            Explore our community members
          </Header>
        </Container>
      </Segment>

      {/* Content Section */}
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        {loading && <Loader active inline="centered" content="Loading users..." />}
        {error && <Message error header="Error" content={error.message} />}
        {data && (
          <List divided relaxed>
            {data.getUsers.map((user) => (
              <List.Item key={user.id}>
                <List.Content>
                  <List.Header>{user.name}</List.Header>
                  <List.Description>
                    Email: {user.email} <br />
                    ID: {user.id}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}
