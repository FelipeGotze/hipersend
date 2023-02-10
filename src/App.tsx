import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

import { api } from './lib/api';
import React, { useEffect, useState } from 'react';
import ToggleButtonCustom from './components/ToggleButtonCustom';
import { Horarios } from './components/Horarios';

type Jornadas = {
  id: string,
  ativo: boolean,
  dia: string,
  inicio: string,
  fim: string,
}[]

type Config = {
  id: string,
  checked: boolean,
  selectedOption: string
}

function App() {
  const [jornadas, setJornadas] = useState<Jornadas>([])
  const [config, setConfig] = useState<Config>(Object)

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    setConfig({ ...config, selectedOption: event.target.value })
  };

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
    setConfig({ ...config, checked: event.target.checked })
  };

  useEffect(() => {
    api.get('/get-jornadas').then(response => {
      setJornadas(response.data.jornadas)
      setSelectedOption(response.data.config.selectedOption);
      setChecked(response.data.config.checked);
      setConfig(response.data.config)
    })
  }, []);

  function handleUpdateDay(id: string) {
    const udpatedJornadas = jornadas.map(jornada => (
      jornada.id === id ? {
        ...jornada,
        ativo: !jornada.ativo
      } : jornada
    ))

    setJornadas(udpatedJornadas);
  }

  function handleTime(id: string, inicio: string, fim: string) {
    const udpatedJornadas = jornadas.map(jornada => (
      jornada.id === id ? {
        ...jornada,
        inicio,
        fim
      } : jornada
    ))

    setJornadas(udpatedJornadas);
  }

  function handleSubmit() {

    console.log(config)

    jornadas.forEach(jornada => {
      api.put('/salvar', { jornada, config }).then(response => (
        console.log(response.data)
      ));
    })

  }

  return (
    <Container sx={{ maxWidth: "lg", marginX: "auto" }}>

      <FormGroup>
        <Box display="flex" flexDirection="column" gap="32px" textAlign="center" sx={{ maxWidth: "500px", margin: "auto" }}>
          <Box>
            <Typography>Configurar Jornada de trabalho</Typography>
            <Checkbox checked={checked} onChange={handleCheckboxChange} /> <Typography>Ativar Jornada de trabalho</Typography>
          </Box>

          <Box>
            <Typography>Configurar Jornada de trabalho</Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="selectForm">Selecione</InputLabel>
              <Select value={selectedOption} onChange={handleOptionChange}>
                <MenuItem value="abortar">Abortar</MenuItem>
                <MenuItem value="enviar">Enviar no próximo expediente</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box display="flex" flexDirection="row" justifyContent="space-between" gap="16px">
            {jornadas.map(jornada => (
              <ToggleButtonCustom
                key={jornada.id}
                label={jornada.dia.substr(0, 1)}
                value={jornada.dia}
                selected={jornada.ativo}
                idJornada={jornada.id}
                handleUpdateDay={handleUpdateDay}
              />
            ))}
          </Box>

          <Box display="flex" flexDirection="column">
            {jornadas.map(jornada => (
              jornada.ativo && <Horarios
                key={jornada.id}
                id={jornada.id}
                dia={jornada.dia}
                valor_inicio={jornada.inicio}
                valor_fim={jornada.fim}
                handleHora={handleTime}
              />
            ))}
          </Box>

          <Box>
            <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
          </Box>
        </Box>

      </FormGroup>

    </Container>
  )
}

export default App
