import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante'

const AdministracaoRestaurante = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await http.get('restaurantes/');
                setRestaurantes(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [restaurantes])

    function deletarEntrada(restaurante: IRestaurante) {
        try {
            http.delete(`restaurantes/${restaurante.id}/`)
                .then(() => {
                    const restaurantesAtt = restaurantes.filter(r => r.id !== restaurante.id);
                    setRestaurantes(restaurantesAtt);
                })
            alert('Restaurante deletado com sucesso!');

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
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes && restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => deletarEntrada(restaurante)} variant='outlined' color='error'>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurante;