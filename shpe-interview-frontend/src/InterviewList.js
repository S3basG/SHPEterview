// InterviewList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Header, Card, Loader, Message } from 'semantic-ui-react';

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

  if (loading) return <Loader active inline="centered" content="Loading interviews..." />;
  if (error) return <Message error header="Error" content={error.message} />;

  if (data.getInterviews.length === 0) {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Header as="h2">Interviews</Header>
        <Message info header="No Interviews Found" content="Try creating one!" />
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">Interviews</Header>
      <Card.Group>
        {data.getInterviews.map((interview) => (
          <Card key={interview.id}>
            <Card.Content>
              <Card.Header>Interview ID: {interview.id}</Card.Header>
              <Card.Meta>
                Candidate: {interview.candidate?.name} ({interview.candidate?.email})
              </Card.Meta>
              <Card.Meta>
                Interviewer: {interview.interviewer?.name} ({interview.interviewer?.email})
              </Card.Meta>
              <Card.Description>
                <strong>Questions:</strong> {interview.questions.join(', ')} <br />
                <strong>Status:</strong> {interview.status}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
