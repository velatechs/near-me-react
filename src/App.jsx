// src/App.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import NearMePage from './components/NearMePage';
import theme from './theme';
import { Global } from '@emotion/react';

const globalStyles = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: 'Readex Pro, sans-serif',
    backgroundColor: theme.colors.primaryBackground,
    color: theme.colors.primaryText,
  },
};

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    fetch('https://apps.5bestincity.com/jsonapi/nearmejson.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched successfully:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <NearMePage data={data} />
      ) : (
        <div></div>
      )}
    </ThemeProvider>
  );
}

export default App;