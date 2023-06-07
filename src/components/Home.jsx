import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <Container>
      <Box sx={{ my: 15 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Tipo Test Ordenanzas Municipales del Taxi en Algeciras
        </Typography>
        <Container>
          <Typography variant="body1" gutterBottom>
            Selecciona <strong>Pregunta aleatoria</strong> para poder realizar preguntas a tu antojo o prueba el modo{' '}
            <strong>Examen</strong> para poner a prueba tus conocimientos
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center'}}>
            <Button component={Link} to="/questions" variant="contained" color="primary" sx={{ mr: 2 }}>
              Pregunta aleatoria
            </Button>
            <Button component={Link} to="/exam" variant="contained" color="primary">
              Modo Examen
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default Home;
