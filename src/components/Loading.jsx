import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function LoadingCircle() {
  return (
    <Container sx={{mt: 20}}>
      <CircularProgress />
      <Typography>Cargando...</Typography>
    </Container>
  );
}

export default LoadingCircle;