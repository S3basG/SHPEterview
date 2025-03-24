import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_INTERVIEWS = gql`
  query {
    getInterviews {
      id
      candidate {
        name
        email
      }
      interviewer {
        name
        email
      }
      questions
      status
    }
  }
`;

export default function InterviewList() {
  const { loading, error, data } = useQuery(GET_INTERVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data.getInterviews.length === 0) {
    return <p>No interviews found.</p>;
  }

  return (
    <div>
      <h2>Interviews</h2>
      {data.getInterviews.map(interview => (
        <div key={interview.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>ID:</strong> {interview.id}</p>
          <p><strong>Candidate:</strong> {interview.candidate?.name} ({interview.candidate?.email})</p>
          <p><strong>Interviewer:</strong> {interview.interviewer?.name} ({interview.interviewer?.email})</p>
          <p><strong>Questions:</strong> {interview.questions.join(', ')}</p>
          <p><strong>Status:</strong> {interview.status}</p>
        </div>
      ))}
    </div>
  );
}
