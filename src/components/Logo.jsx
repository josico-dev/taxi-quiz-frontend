import React from 'react';
import Box from '@mui/material/Box';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Logo(props) {
    return (
        <Box sx={props.style}>
            <Link to="/">
                <img src={logo} alt="Logo" style={{ height: '5em' }} />
            </Link>
        </Box>
    );
}

export default Logo;