import React from 'react';
import styled, { keyframes } from 'styled-components';
import othersData from './othersData'; // Import the data file

const highlightColor = 'rgb(176, 221, 133)';
const pillBackgroundColor = '#333'; // Darker grey color for the pill background

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 20px;
  display: flex;
  flex-direction: column; 
  gap: 20px; /* Adds margin between sections */
  overflow-x: hidden;
  overflow-y: auto; 
  box-sizing: border-box;
`;

const Section = styled.div`
  background-color: #1e1e1e;
  color: #c9d1d9;
  padding: 15px 20px;  /* Adjusted padding to reduce the gap at the top */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.8s ease-in-out;  /* Slide in animation */
  opacity: 0;
  animation-fill-mode: forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  margin-top: 0;  /* Remove extra space above the title */
  font-size: 1.4em;  /* Smaller font size for the title */
  color: ${highlightColor};
`;

const SubSectionTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 1.1em;
  color;
`;

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;  /* Arrange items in rows */
  gap: 10px;
`;

const Pill = styled.div`
  background-color: ${pillBackgroundColor};  // Darker background color
  color: #ddd;  // Lighter, more peaceful text color
  padding: 6px 10px;  // Slightly reduced padding
  border-radius: 20px;
  font-size: 0.8em;  // Smaller font size
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${highlightColor};
    color: #000;
  }
`;

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Experience = styled.div`
  background-color: #2c2c2c;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExperienceName = styled.h4`
  margin: 0;
  font-size: 1.2em;
  color: ${highlightColor};
`;

const ExperienceTime = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  color: #aaa;
`;

const Bullets = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin: 10px 0 0 0;
  font-size: 0.9em;
`;

const Bullet = styled.li`
  margin-bottom: 5px;
`;

function Others() {
  return (
    <Container>
      {othersData.map((section, index) => (
        <Section key={index} delay={0.1 * index}>
          <SectionTitle>{section.title}</SectionTitle>
          
          {section.courses && (
            <PillContainer>
              {section.courses.map((course, idx) => (
                <Pill key={idx}>{course}</Pill>
              ))}
            </PillContainer>
          )}
          
          {section.skills && Object.entries(section.skills).map(([subSection, items], idx) => (
            <div key={idx}>
              <SubSectionTitle>{subSection}</SubSectionTitle>
              <PillContainer>
                {items.map((item, itemIdx) => (
                  <Pill key={itemIdx}>{item}</Pill>
                ))}
              </PillContainer>
            </div>
          ))}

          {section.experiences && (
            <ExperienceContainer>
              {section.experiences.map((exp, idx) => (
                <Experience key={idx}>
                  <ExperienceName>{exp.name}</ExperienceName>
                  <ExperienceTime>{exp.time}</ExperienceTime>
                  <Bullets>
                    {exp.bullets.map((bullet, id) => (
                      <Bullet key={id}>{bullet}</Bullet>
                    ))}
                  </Bullets>
                </Experience>
              ))}
            </ExperienceContainer>
          )}
        </Section>
      ))}
    </Container>
  );
}

export default Others;
