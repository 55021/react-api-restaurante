import axios from 'axios';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

const Restaurante = ({ restaurante }: { restaurante: IRestaurante }) => {
  const [prato, setPrato] = useState<IPrato[]>([]);

  useEffect(() => {
    async function fetchPrato() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`);
        setPrato(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPrato();
  }, [restaurante.id])

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {prato?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante