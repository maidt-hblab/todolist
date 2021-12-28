import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Home = () => {
  return(
    <>
    <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#eee', height: '100vh' }}>
          <Box>
            <Link to="todo/list">List ToDo</Link>
          </Box>
          <Box>
            <Link to="todo/create">Create Todo</Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;