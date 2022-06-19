import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros])

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      try {
        http.put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante
        });
        alert('Restaurante atualizado com sucesso!');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        http.post('restaurantes/', {
          nome: nomeRestaurante
        });
        alert('Restaurante cadastrado com sucesso!');
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Box>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography
              component='h1'
              variant='h6'
            >
              Formulário de Restaurantes
            </Typography>
            <Box
              component='form'
              sx={{ width: '100%' }}
              onSubmit={aoSubmeterForm}
            >
              <TextField
                fullWidth
                value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event.target.value)}
                label="Nome do restaurante"
                variant="standard"
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                sx={{ marginTop: 1 }}
              >Cadastrar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioRestaurante