// filepath: c:\Users\sebth\Documents\SHPEGithub\SHPEterview\shpe-interview-frontend\src\UserList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Header, List, Loader, Message } from 'semantic-ui-react';

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

  if (loading) return <Loader active inline="centered" content="Loading users..." />;
  if (error) return <Message error header="Error" content={error.message} />;

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">User List</Header>
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
    </Container>
  );
}