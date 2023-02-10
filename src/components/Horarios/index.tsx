import { Typography, FormControl, TextField, InputAdornment, Box } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface HorarioProps {
    id: string,
    dia: string,
    valor_inicio: string,
    valor_fim: string
    handleHora: (id: string, horaInicio: string, horaFim: string) => void;
}

export function Horarios({ id, dia, valor_inicio, valor_fim, handleHora }: HorarioProps) {
    return (
        <Box display="flex" flexDirection="row">
            <Typography paddingTop='17px' px="16px" width="80px;">{dia}</Typography>
            <FormControl variant="outlined" sx={{ m: 1, width: 180 }}>
                <TextField
                    id={id}
                    label="Início"
                    defaultValue={valor_inicio}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AccessTimeIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    onChange={(e) => handleHora(id, e.target.value, valor_fim)}
                />
            </FormControl>
            <Typography paddingTop='17px' px="16px">até</Typography>
            <FormControl variant="outlined" sx={{ m: 1, width: 180 }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Fim"
                    defaultValue={valor_fim}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AccessTimeIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    onChange={(e) => handleHora(id, valor_inicio, e.target.value)}
                />
            </FormControl>
        </Box>
    )
}