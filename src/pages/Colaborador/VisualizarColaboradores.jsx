import React, { useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Tabela from '../../components/Tabela/VisualizarColaborador';
import axios from 'axios';
import FlashMessage from '../../components/FlashMessage/FlashMessage';
import { PulseLoader } from "react-spinners";

export default function VisualizarColaborador() {
  const [msg, setMsg] = useState('');
  const [tipo, setTipo] = useState('');
  const [colaboradores, setColaboradores] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getAll = () =>{
      const options = {
        url: `${process.env.REACT_APP_BASE_URL}/colaborador/all`,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };

      axios(options)
        .then(res => {
          setColaboradores(res.data ?? null);
          setIsLoading(false);
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
       {isLoading ?           
       <div className='spinner'>
          <PulseLoader color="#123abc" loading={isLoading} size={20} />
        </div> 
        : 
        <Tabela colaboradores={colaboradores ?? null} setTipo={setTipo} setMsg={setMsg} />}
      </section>
    </main>
    </div>  
  );
};
