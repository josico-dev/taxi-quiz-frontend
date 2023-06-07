import React, { useState } from 'react';
import { IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ExitButton(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    props.finishExam();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <IconButton onClick={handleClick} size='large'>
        <HighlightOffIcon fontSize='inherit' />
      </IconButton>

      {/* Warning dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro que quieres salir?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} color='error'>Salir</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ExitButton;
