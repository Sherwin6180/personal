import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Overview from './components/Overview';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Others from './components/Others';

const highlightColor = 'rgb(176, 221, 133)';

// Define animations
const slideInFromTop = keyframes`
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Container for the entire app
const Container = styled.div`
  font-family: 'Roboto Mono', monospace;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #000;
  color: #c9d1d9;
  display: flex;
  flex-direction: column;
`;

// Tabs container
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4em; /* 4em margin from the top */
  gap: 2em; /* Space between tabs */
  animation: ${slideInFromTop} 0.7s ease-out;
`;

// Individual tab styling
const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  color: ${props => (props.active ? highlightColor : '#c9d1d9')};

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${highlightColor};
    left: 0;
    bottom: -5px;
    transform: ${props => (props.active ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
  }
`;

// Wrapper for the main content
const ContentWrapper = styled.div`
  width: 60%; /* 2/3 of the width for content */
  margin: 0 auto;
  padding: 20px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  // justify-content: center;
`;

function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</Tab>
        <Tab active={activeTab === 'Experience'} onClick={() => setActiveTab('Experience')}>Experience</Tab>
        <Tab active={activeTab === 'Projects'} onClick={() => setActiveTab('Projects')}>Projects</Tab>
        <Tab active={activeTab === 'Others'} onClick={() => setActiveTab('Others')}>Others</Tab>
      </Tabs>
      <ContentWrapper>
        {activeTab === 'Overview' && <Overview />}
        {activeTab === 'Experience' && <Experience />}
        {activeTab === 'Projects' && <Projects />}
        {activeTab === 'Others' && <Others />}
      </ContentWrapper>
    </Container>
  );
}

export default App;
