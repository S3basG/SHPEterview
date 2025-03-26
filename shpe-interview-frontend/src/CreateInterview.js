import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Container, Form, Button, Message, Segment, Header } from 'semantic-ui-react';


const CREATE_INTERVIEW = gql`
  mutation CreateInterview($candidateId: ID!, $interviewerId: ID, $questions: [String]!) {
    createInterview(candidateId: $candidateId, interviewerId: $interviewerId, questions: $questions) {
      id
      candidate {
        name
      }
      interviewer {
        name
      }
      questions
      status
    }
  }
`;

export default function CreateInterview() {
  const [candidateId, setCandidateId] = useState('');
  const [interviewerId, setInterviewerId] = useState('');
  const [questionList, setQuestionList] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [createInterview, { loading }] = useMutation(CREATE_INTERVIEW, {
    onCompleted: (data) => {
      setSuccessMsg(`Interview created with ID: ${data.createInterview.id}`);
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionsArray = questionList.split(',').map(q => q.trim());
    createInterview({ variables: { candidateId, interviewerId, questions: questionsArray } });
  };

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
            'url("/vro.jpg") center 30%/cover no-repeat',
          position: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        vertical
      >
        {/* Dark overlay */}
        <div className="create-interview-overlay" />

        <Container text>
          <Header as="h1" inverted style={{ fontSize: '3em', fontWeight: 'bold' }}>
            Create Interview
          </Header>
          <Header as="h2" inverted style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: '0.5em' }}>
            Schedule your next interview today!
          </Header>
        </Container>
      </Segment>

      {/* Form Section */}
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container style={{ maxWidth: '600px' }}>
          <Form onSubmit={handleSubmit} loading={loading} error={!!errorMsg}>
            <Form.Input
              label="Candidate ID"
              placeholder="Enter Candidate ID"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              required
            />
            <Form.Input
              label="Interviewer ID (optional)"
              placeholder="Enter Interviewer ID"
              value={interviewerId}
              onChange={(e) => setInterviewerId(e.target.value)}
            />
            <Form.Input
              label="Questions"
              placeholder="Enter questions, separated by commas"
              value={questionList}
              onChange={(e) => setQuestionList(e.target.value)}
              required
            />
            <Button primary type="submit" fluid style={{ marginTop: '1em' }}>
              {loading ? 'Creating Interview...' : 'Create Interview'}
            </Button>
          </Form>
          {successMsg && <Message positive style={{ marginTop: '1em' }}>{successMsg}</Message>}
          {errorMsg && <Message negative style={{ marginTop: '1em' }}>Error: {errorMsg}</Message>}
        </Container>
      </Segment>
    </>
  );
}
