import React from 'react'
import { createTheme, ThemeProvider, ToggleButton, Typography } from "@mui/material";
import { green } from '@mui/material/colors';

interface ButtonProps {
    label: string;
    value: string;
    selected: boolean;
    idJornada: string;
    handleUpdateDay: (id: string) => void;
}

function ToggleButtonCustom({ label, value, selected, idJornada, handleUpdateDay }: ButtonProps) {
    return (
        <ToggleButton
            component="div"
            selected={selected}
            value={value}
            onChange={() => handleUpdateDay(idJornada)}
            color={'primary'}
            sx={{ borderRadius: "50px", width: "50px", height: "50px" }}
        >
            <Typography>{label}</Typography>
        </ToggleButton>
    );
}

export default ToggleButtonCustom