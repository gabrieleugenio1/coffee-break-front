import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import Accordion from "./components/Accordion";
import FlashMessage from '../../components/FlashMessage/FlashMessage';

export default function GerenciarCoffee() {
  const [msg, setMsg] = useState('');
  const [tipo, setTipo] = useState('');
  return (
    <div>
      <Header/>
      { alert && <FlashMessage type={`${tipo}`} msg={`${msg}`}/>}
      <main className="main container">
        <section>
          <h3>Criar Coffee Break</h3>
          <Accordion setTipo={setTipo} setMsg={setMsg}/>
        </section>
    </main>
    </div>  
  );
};
