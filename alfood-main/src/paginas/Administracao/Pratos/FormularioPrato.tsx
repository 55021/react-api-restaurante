import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null)

    const parametros = useParams();

    useEffect(() => {
        try {
            http.get<{ tags: ITag[] }>('tags/')
                .then(resposta => setTags(resposta.data.tags));
            http.get<IRestaurante[]>('restaurantes/')
                .then(resposta => setRestaurantes(resposta.data));
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => setNomePrato(resposta.data.nome));
        }
    }, [parametros])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => alert('Prato cadastrado com sucesso!'))
            .catch(error => console.error(error))
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
                            Formulário de pratos
                        </Typography>
                        <Box
                            component='form'
                            sx={{ width: '100%' }}
                            onSubmit={aoSubmeterForm}
                        >
                            <TextField
                                fullWidth
                                value={nomePrato}
                                onChange={event => setNomePrato(event.target.value)}
                                label="Nome do prato"
                                variant="standard"
                                margin='dense'
                                required
                            />
                            <TextField
                                fullWidth
                                value={descricao}
                                onChange={event => setDescricao(event.target.value)}
                                label="Descrição do prato"
                                variant="standard"
                                margin='dense'
                                required
                            />

                            <FormControl
                                margin='dense'
                                fullWidth
                            >
                                <InputLabel id='select-restaurant'>
                                    Restaurante
                                </InputLabel>
                                <Select labelId='select-restaurant' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                        {restaurante.nome}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl
                                margin='dense'
                                fullWidth
                            >
                                <InputLabel id='select-tag'>
                                    Tag
                                </InputLabel>
                                <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
                                    {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                        {tag.value}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <input type='file' onChange={selecionarArquivo}/>
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

export default FormularioPrato