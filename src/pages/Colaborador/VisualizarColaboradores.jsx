import React, { useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/VisualizarColaborador';
import axios from 'axios';
import FlashMessage from '../../components/FlashMessage/FlashMessage';

export default function VisualizarColaborador() {
  const [msg, setMsg] = useState('');
  const [tipo, setTipo] = useState('');
  const [colaboradores, setColaboradores] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const getAll = () =>{
      const options = {
        url: 'http://localhost:8080/colaborador/all',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };

      axios(options)
        .then(res => {
          setColaboradores(res.data ?? null);
          setLoading(true);
          console.log(res.data);
      });
  }
  getAll();
  }, [])

  return (
    <div>
      <Header/>
      <FlashMessage type={`${tipo}`} msg={`${msg}`}/>
      <main className="main container">
      <section>
       {loading && <Tabela colaboradores={colaboradores ?? null} setTipo={setTipo} setMsg={setMsg} />}
      </section>
    </main>
    </div>  
  );
};
