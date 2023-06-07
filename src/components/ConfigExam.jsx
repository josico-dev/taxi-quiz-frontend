import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/material";

function ConfigExam(props) {
    const [n_questions, setNQuestions] = React.useState(10);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setReady(true);
    };

    const handleIncrement = () => {
        setNQuestions((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setNQuestions((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}>
                    <TextField
                        type="text"
                        value={n_questions}
                        onChange={(e) => setNQuestions(e.target.value)}
                        label="Número de preguntas"
                        InputProps={{
                            inputMode: "numeric",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small" onClick={handleDecrement}>
                                        <RemoveIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={handleIncrement}>
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Empezar
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default ConfigExam;