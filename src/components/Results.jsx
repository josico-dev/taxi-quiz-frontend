import React from 'react';
import { Typography, Paper, List, ListItemIcon, Box} from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Results(props) {
  const questionContainerStyle = {
    marginTop: '16px',
    marginBottom: '16px',
    padding: '16px',
  };

  const optionContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
    textAlign: 'left'
  };

  const renderOptions = (options, userAnswer, correctAnswer) => {
    return options.map((option, index) => {
      const isUserAnswer = option === userAnswer;
      const isCorrectAnswer = option === correctAnswer;
      const icon = isUserAnswer ? (
        <RadioButtonCheckedIcon color={isCorrectAnswer ? 'primary' : 'error'} />
      ) : (
        <RadioButtonUncheckedIcon />
      );

      return (
        <Box key={index} sx={optionContainerStyle}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography variant="body1">{option}</Typography>
        </Box>
      );
    });
  };

  return (
    <div>
      <Typography variant="h4" sx={{paddingTop: 5}}>Resultados del examen</Typography>
      <Typography variant="h5">Acertadas: {props.passed}</Typography>
      <Typography variant="h5">Falladas: {props.failed}</Typography>
      <Typography variant="h5">Total: {props.total}</Typography>
      <List>
        {props.questionsResults.map((question, index) => {
          return (
            <Paper key={index} sx={questionContainerStyle}>
              <Typography><strong>Pregunta {index + 1}</strong></Typography>
              <Typography variant="h6">{question.text}</Typography>
              <List>
                {renderOptions(question.options, question.user_answer, question.answer)}
              </List>
              <Typography sx={{color: 'black' }}>
                <strong>Respuesta correcta:</strong>{' '}
                <Typography sx={{ color: 'green'}}>
                  {question.answer}
                </Typography>
              </Typography>
            </Paper>
          );
        })}
      </List>
    </div>
  );
}

export default Results;
