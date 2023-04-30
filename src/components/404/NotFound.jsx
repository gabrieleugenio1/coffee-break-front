import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Index() {

  return (
    <div>
      <main className="main container">
        <section className="main__404">

          <div>
            <h3>Erro: 404</h3>
            <h4>Página não encontrada</h4>
            <Link to="/">Clique aqui para voltar</Link>
          </div>
          
        </section>

    </main>
    </div>  
  );
};

