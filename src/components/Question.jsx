import React, { Component } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

class ErrorRadios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      helperText: 'Escoge la respuesta correcta',
      submitted: false,
      options: [],
    };
  }

  componentDidMount() {
    const { question } = this.props;
    if (question.options !== undefined) {
      const options = this.shuffleArray(JSON.parse(question.options));
      this.setState({ options });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question.options !== this.props.question.options) {
      const options = this.shuffleArray(JSON.parse(this.props.question.options));
      this.setState({ options });
    }
  }

  handleRadioChange = (event) => {
    this.setState({
      value: event.target.value,
      helperText: ' ',
      error: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitted, value } = this.state;
    const { question, incrementPassed, incrementFailed, incrementIndex } = this.props;
    
    if (!submitted) {
      if (value === question.answer) {
        this.setState({
          helperText: '¡Genial!',
          error: false,
          submitted: true,
        });
        incrementPassed();
      } else if (value !== question.answer && value !== '') {
        this.setState({
          helperText: 'Respuesta equivocada.',
          submitted: true,
          error: true,
        });
        incrementFailed();
      } else {
        this.setState({
          helperText: 'Pregunta sin responder.',
          submitted: true,
          error: true,
        });
      }
    } else {
      this.setState({
        submitted: false,
        helperText: 'Escoge la respuesta correcta',
      });
      incrementIndex();
    }
  };

  shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  render() {
    const { style, question } = this.props;
    const { value, helperText, error, submitted, options } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl sx={style} disabled={submitted} error={error} variant="standard">
          <FormLabel id="demo-error-radios">
            <h3>{question.text}</h3>
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={this.handleRadioChange}
            sx={{ gap: 2 }}
          >
            {options.map((option, index) => (
              <FormControlLabel
                id={index}
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                sx={{ textAlign: 'left' }}
              />
            ))}
          </RadioGroup>
          <FormHelperText sx={{ textAlign: 'center' }}>
            {submitted ? (
              <Typography sx={{color: 'black' }}>
                <strong>Respuesta correcta:</strong>{' '}
                <Typography sx={{ color: error ? 'red' : 'green' }}>
                  {question.answer}
                </Typography>
              </Typography>
            ) : (
              helperText
            )}
          </FormHelperText>
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            {submitted ? 'Siguiente pregunta' : 'Ver respuesta'}
          </Button>
        </FormControl>
      </form>
    );
  }
}

export default ErrorRadios;
