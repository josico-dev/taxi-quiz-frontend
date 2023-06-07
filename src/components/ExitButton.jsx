import React from 'react';
import { IconButton, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ExitButton (props){
    return(
        <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                <IconButton onClick={props.finishExam} size='large'>
                    <HighlightOffIcon fontSize='inherit'/>
                </IconButton>
            </Box>
    )
}

export default ExitButton;