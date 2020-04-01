import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Form from './Form';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Form/>
      </Container>
    </React.Fragment>
  );
}

export default App;
