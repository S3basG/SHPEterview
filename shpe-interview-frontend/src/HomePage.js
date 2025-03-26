import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Image } from 'semantic-ui-react';
import './HomePage.css';

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: '100vh',
          padding: '6em 0em',
          background: '#1a1a1a', // A clean, dark background
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        vertical
      >
        {/* Hero Content */}
        <Container text className="hero-content">
          <Header
            as="h1"
            inverted
            style={{
              fontSize: '3.5em',
              fontWeight: 'bold',
              marginBottom: '0.5em',
            }}
          >
            SHPEterview App
          </Header>
          <Header
            as="h2"
            inverted
            style={{
              fontSize: '1.8em',
              fontWeight: 'normal',
            }}
          >
            Practice your interviewing skills and land your dream job!
          </Header>

          <Image
            src="./SHPELogo.png"
            size="small"
            centered
            style={{ marginTop: '2em' }}
          />

          <Button
            primary
            size="huge"
            as={Link}
            to="/register"
            style={{ marginTop: '2em' }}
          >
            Get Started
            <Icon name="right arrow" />
          </Button>
        </Container>

        {/* Wave Transition at the bottom */}
        <div className="wave-container">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,144C672,128,768,96,864,85.3C960,75,1056,85,1152,122.7C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </Segment>

      {/* Secondary Section (white background) */}
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
    </>
  );
}

export default HomePage;
