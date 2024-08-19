import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2.5em;
  color: #0073b1;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
  color: #555;
`;

function Header() {
  return (
    <HeaderContainer>
      <Name>Your Name</Name>
      <Title>Your Professional Title</Title>
    </HeaderContainer>
  );
}

export default Header;
