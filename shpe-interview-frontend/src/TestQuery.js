import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      {data.getUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        data.getUsers.map((user) => (
          <div key={user.id}>
            <p>{user.name} - {user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}
