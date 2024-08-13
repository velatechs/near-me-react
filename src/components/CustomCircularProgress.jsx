import React from 'react';
import styled from '@emotion/styled';

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: ${props => props.theme.colors.primary};
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CustomCircularProgress = () => {
  return <Spinner />;
};

export default CustomCircularProgress;