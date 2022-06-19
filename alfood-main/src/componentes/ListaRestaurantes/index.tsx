import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/');
        setRestaurantes(data.results);
        setProximaPagina(data.next);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [])

  const verMais = async () => {
    try {
      const { data } = await axios.get<IPaginacao<IRestaurante>>(proximaPagina);
      setRestaurantes(restaurantes => [...restaurantes, ...data.results]);
      setProximaPagina(data.next);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {proximaPagina && <button onClick={verMais}>
        Ver mais
      </button>}
    </section>)
}

export default ListaRestaurantes