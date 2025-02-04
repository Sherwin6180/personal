import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import projects from './projectData'; // Adjust the path if necessary

const highlightColor = 'rgb(176, 221, 133)';
const pillBackgroundColor = '#555'; // A more subdued grey color

const floatUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);  // Start from below
  }
  50% {
    opacity: 0.5;
    transform: translateY(-10px);  // Slight bob above the final position
  }
  100% {
    opacity: 1;
    transform: translateY(0);  // Settle at the final position
  }
`;

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* Remove white margins on small screens */
  @media screen and (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const TagButton = styled.button`
  background-color: ${props => (props.selected ? highlightColor : '#333')};
  color: ${props => (props.selected ? '#000' : '#c9d1d9')};
  border: none;
  padding: 8px 15px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${highlightColor};
    color: #000;
  }

  &::before {
    content: '#';
    margin-right: 5px;
    color: ${props => (props.selected ? '#000' : highlightColor)};
  }
`;

const Card = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  margin: 1em 0;
  padding: 1em;
  color: #c9d1d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  position: relative;
  animation: ${floatUp} 1s ease-out;

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin: 0 0 1em;
  }
`;

const ProjectName = styled.h3`
  margin: 0;
  font-size: 1.5em;
  color: ${highlightColor};
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of the project name and status */
  align-items: center;
`;

const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${pillBackgroundColor};
  color: #ddd;
  font-size: 0.6em;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 10px;

  ${props =>
    props.status === 'live' &&
    css`
      &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: green;
        border-radius: 50%;
        margin-right: 5px;
        animation: ${blink} 1.5s infinite;
      }
    `}

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${highlightColor};
    }
  }
`;

const ProjectTime = styled.p`
  font-size: 0.9em;
  color: #999;
  position: absolute;
  top: 10px;
  right: 10px;

  @media screen and (max-width: 768px) {
    position: static;
    font-size: 0.8em;
    margin-top: 5px;
    text-align: right;
  }
`;

const ProjectLink = styled.a`
  color: ${highlightColor};
  text-decoration: none;
  font-size: 1.2em;
  margin-top: 10px;
  display: inline-flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    color: ${highlightColor};
  }
`;

const Bullets = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 0.5em 0;
    padding-left: 1.2em;
    position: relative;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${highlightColor};
      font-weight: bold;
    }
  }
`;

function Projects() {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredProjects = selectedTags.length === 0
    ? projects
    : projects.filter(project => selectedTags.every(tag => project.tags.includes(tag)));

  const allTags = [...new Set(projects.flatMap(project => project.tags))];

  return (
    <Container>
      <FilterContainer>
        {allTags.map(tag => (
          <TagButton
            key={tag}
            selected={selectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </FilterContainer>

      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <Card key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <ProjectTime>{project.time}</ProjectTime>
            <ProjectName>
              {project.name}
              <StatusPill status={project.status ? 'live' : 'under construction'}>
                {project.status ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                ) : (
                  '🚧 In Progress'
                )}
              </StatusPill>
            </ProjectName>
            <Bullets>
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </Bullets>
          </Card>
        ))
      ) : (
        <p>No projects match the selected tags.</p>
      )}
    </Container>
  );
}

export default Projects;
