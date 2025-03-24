
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Container, Form, Button, Message } from 'semantic-ui-react';

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
    <Container style={{ marginTop: '2em' }}>
      <Form onSubmit={handleSubmit} loading={loading}>
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
        <Button primary type="submit">
          {loading ? 'Creating Interview...' : 'Create Interview'}
        </Button>
      </Form>
      {successMsg && <Message positive>{successMsg}</Message>}
      {errorMsg && <Message negative>Error: {errorMsg}</Message>}
    </Container>
  );
}
