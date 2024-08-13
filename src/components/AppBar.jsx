// src/components/AppBar.jsx
import React from 'react';
import styled from '@emotion/styled';

const AppBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.info};
  height: 50px;
  display: flex;
  justify-content: center; // Center the content horizontally
  align-items: center;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.info};
`;
const AppBar = () => {
    return (
      <AppBarContainer>
        <Title>Near Me</Title>
      </AppBarContainer>
    );
  };

export default AppBar;
 