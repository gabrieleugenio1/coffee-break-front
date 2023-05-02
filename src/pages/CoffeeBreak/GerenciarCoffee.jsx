import React from 'react';
import Header from '../../components/Header/Header';
import Accordion from "./components/Accordion";

export default function GerenciarCoffee() {


  return (
    <div>
      <Header/>

      <main className="main container">
        <section>
          <Accordion/>
        </section>
    </main>
    </div>  
  );
};
