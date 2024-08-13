// src/components/AppBar.jsx
import React from 'react';
import styled from '@emotion/styled';
import { Menu } from 'lucide-react';

const AppBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.info};
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const MenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.colors.info};
  cursor: pointer;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.titleMedium};
  color: ${({ theme }) => theme.colors.info};
  margin-left: 16px;
`;

const AppBar = () => {
  return (
    <AppBarContainer>
      <MenuIcon size={28} />
      <Title>Near Me</Title>
    </AppBarContainer>
  );
};

export default AppBar;