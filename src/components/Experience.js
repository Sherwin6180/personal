import React from 'react';
import styled, { keyframes } from 'styled-components';
import experiences from './experienceData'; // Adjust the path if necessary

const highlightColor = 'rgb(176, 221, 133)';

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Card = styled.div`
  display: flex;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin: 1em 0;
  padding: 1em;
  color: #c9d1d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${({ isOdd }) => (isOdd ? slideInLeft : slideInRight)} 1s ease-in-out;
`;

const PhotoSection = styled.div`
  flex: 1;
  max-width: 1/6;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const DetailsSection = styled.div`
  flex: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0.5em;
  padding-left: 1em;
`;

const CompanyRole = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  .company {
    font-size: 1.2em;
    font-weight: bold;
    display: block;
    color: ${highlightColor};
  }

  .role {
    font-size: 1em;
    font-style: italic;
    font-weight: normal;
    display: block;
    margin-top: 0.2em; /* Optional: add some space between company and role */
  }
`;


const LocationTime = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  text-align: right;
  font-size: 1em;

  span {
    display: block;
  }
`;

const Bullets = styled.ul`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  list-style: none;
  padding: 0;

  li {
    margin: 0.5em 0;
    position: relative;
    padding-left: 1.2em;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${highlightColor}; /* Use the highlight color */
      font-weight: bold;
    }

    a {
      font-style: italic;
      color: yellow; /* Ensure links use the highlight color */
      text-decoration: none; /* Remove underline */
    }
  }
`;


function parseURLs(text) {
  const urlPattern = /\[url="?([^"]*)"?\](.*?)\[\/url\]/g;
  return text.replace(urlPattern, (match, url, anchorText) => {
    return `<a href="${url}" target="_blank">${anchorText}</a>`;
  });
}


function Experience() {
  return (
    <div>
      {experiences.map((exp, index) => (
        <Card key={index} isOdd={index % 2 === 0}>
          <PhotoSection>
            <img src={exp.picture} alt={`${exp.company} logo`} />
          </PhotoSection>
          <DetailsSection>
            <CompanyRole>
              <span className="company">{exp.company}</span>
              <span className="role">{exp.role}</span>
            </CompanyRole>
            <LocationTime>
              <span>{exp.location}</span>
              <span>{exp.time}</span>
            </LocationTime>
            <Bullets>
              {exp.bullets.map((bullet, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: parseURLs(bullet) }} />
              ))}
            </Bullets>
          </DetailsSection>
        </Card>
      ))}
    </div>
  );
}


export default Experience;
