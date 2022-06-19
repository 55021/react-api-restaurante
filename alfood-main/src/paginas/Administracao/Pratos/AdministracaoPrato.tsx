import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPrato = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await http.get('pratos/');
                setPratos(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [pratos])

    function deletarEntrada(prato: IPrato) {
        try {
            http.delete(`pratos/${prato.id}/`)
                .then(() => {
                    const pratosAtt = pratos.filter(r => r.id !== prato.id);
                    setPratos(pratosAtt);
                })
            alert('Prato deletado com sucesso!');

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos && pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.descricao}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target='_blank' rel='noreferrer'>Ver imagem</a>
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => deletarEntrada(prato)} variant='outlined' color='error'>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPrato;