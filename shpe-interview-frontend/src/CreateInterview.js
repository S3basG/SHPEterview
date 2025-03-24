import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
    <div style={{ padding: '20px' }}>
      <h2>Create Interview</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Candidate ID:</label><br />
          <input
            type="text"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Interviewer ID (optional):</label><br />
          <input
            type="text"
            value={interviewerId}
            onChange={(e) => setInterviewerId(e.target.value)}
          />
        </div>
        <div>
          <label>Questions (comma separated):</label><br />
          <input
            type="text"
            value={questionList}
            onChange={(e) => setQuestionList(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Interview'}
        </button>
      </form>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
}
