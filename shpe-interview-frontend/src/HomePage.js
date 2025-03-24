// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon } from 'semantic-ui-react';

function HomePage() {
  return (
    <div>
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: '50vh',
          padding: '5em 0em',
          backgroundImage: 'url("https://images.unsplash.com/photo-1600880292089-90a7e086ee1a")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        vertical
      >
        <Container text>
          <Header
            as="h1"
            inverted
            style={{
              fontSize: '3em',
              fontWeight: 'normal',
              marginBottom: '0',
              marginTop: '1em',
            }}
          >
            Welcome to the SHPE Interview App!
          </Header>
          <Header
            as="h2"
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
            }}
          >
            Practice your interviewing skills and land your dream job!
          </Header>
          <Button primary size="huge" as={Link} to="/register" style={{ marginTop: '1.5em' }}>
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Container>
      </Segment>

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: '2em' }}>
            Why Use the SHPE Interview App?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Whether you’re a student or a professional, practicing your interview skills is essential. 
            Our platform helps you schedule and participate in mock interviews, connect with mentors, 
            and track your progress over time. All powered by SHPE for the community!
          </p>
          <Button as={Link} to="/login" color="green" size="large">
            Log In
          </Button>
          <Button as={Link} to="/test" color="blue" size="large" style={{ marginLeft: '1em' }}>
            Test Query
          </Button>
        </Container>
      </Segment>
    </div>
  );
}

export default HomePage;
