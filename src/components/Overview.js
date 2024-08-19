import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ChatWindow from './ChatWindow';

const highlightColor = 'rgb(176, 221, 133)';

// Keyframes for the animations
const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const bottomToTop = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const leftToRight = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const floatUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);  // Start from below
  }
  70% {
    opacity: 0.5;
    transform: translateY(-10px);  // Slight bob above the final position
  }
  100% {
    opacity: 0.7;
    transform: translateY(0);  // Settle at the final position
  }
`;

// Styled components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  grid-template-rows: auto auto; /* Two rows */
  height: 100%;
  width: 100%;
  gap: 1em; /* Optional gap between grid items */
`;

const NameContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: start;
  justify-self: start;
  text-align: left;
`;

const Name = styled.h1`
  font-size: 3em;
  color: ${highlightColor};
  margin: 0;
  animation: ${slideIn} 1s ease-in-out;
`;

const ProfilePhoto = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: start;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Photo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  animation: ${bottomToTop} 1s ease-in-out;
  cursor: pointer;
`;

const BubbleContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  align-self: start;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Bubble = styled.div`
  background-color: rgba(80, 80, 80, 0.8);
  color: #fff;
  padding: 8px;
  border-radius: 5px;
  font-size: 0.9em;
  width: 150px; /* Match the width of the photo */
  text-align: center;
  animation: ${floatUp} 3s;
`;

const DescriptionContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: end;
  justify-self: start;
  text-align: left;
  animation: ${leftToRight} 1s ease-in-out;
`;

const SocialLinks = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  text-align: center;
  margin-top: 2em;
  animation: ${bottomToTop} 1s ease-in-out;
`;

const SocialLink = styled.a`
  margin-right: 15px;
  color: ${highlightColor};
  text-decoration: none;
  font-size: 1.5em;

  &:hover {
    color: ${highlightColor};
    opacity: 0.8;
  }
`;

const Highlight = styled.span`
  position: relative;
  color: ${highlightColor};
`;

function Overview() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 3000); // Hide bubble after 3 seconds
    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, []);

  return (
    <>
      <GridContainer>
        <NameContainer>
          <p>Hi, my name is</p>
          <Name>Xinyu Liang.</Name>
        </NameContainer>
        <ProfilePhoto>
          <Photo
            src="profile.PNG"
            alt="Your Name"
            onClick={() => setIsChatVisible(true)}
          />
        </ProfilePhoto>
        <BubbleContainer>
          {showBubble && <Bubble>Click on me to chat with my AI agent.</Bubble>}
        </BubbleContainer>
        <DescriptionContainer>
          <p>
            I'm a senior at Georgia Tech in the BSMS Computer Science program, with interests in <Highlight>AI</Highlight>, <Highlight>networking</Highlight>, <Highlight>systems</Highlight>, <Highlight>web development</Highlight>, etc. I’m passionate about innovation and optimization. Outside of work, I enjoy reading, music, building tools, and working out.
          </p>
        </DescriptionContainer>
        <SocialLinks>
          <SocialLink href="https://github.com/sherwin6180" target="_blank">GitHub</SocialLink>
          <SocialLink href="https://www.linkedin.com/in/xliang6180" target="_blank">LinkedIn</SocialLink>
          <SocialLink href="mailto:sherwin6180@gmail.com">Email</SocialLink>
        </SocialLinks>
      </GridContainer>
      <ChatWindow isVisible={isChatVisible} onClose={() => setIsChatVisible(false)} />
    </>
  );
}

export default Overview;
