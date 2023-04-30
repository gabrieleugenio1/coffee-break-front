import React, { useState, useEffect} from 'react';
import './styles.css';
import Header from '../components/Header/Header';
import VisualizarCoffeeBreaks from '../components/Tabela/VisualizarCoffeeBreak';
import axios from 'axios';
import moment from 'moment/moment';

export default function Index() {
  const [coffee, setCoffee] = useState();

  const filtrado = (data) =>{
    console.log(data)
    const result = {};
    if(data != null && data !== undefined && data) {
      
      for(let item of data){
        const colaborador_id = item[5];
        if(!result[colaborador_id]){
          result[colaborador_id] = {
            id_coffe: item[0],
            data_coffee: moment(item[1]).format('DD/MM/YYYY'),
            coffee_break_id: item[4],
            cpf: item[7],
            created_at: item[8],
            nome: item[9],
            id_presenca: item[10],
            presente: item[11],
            opcoes: [item[3]]
          }
        } else {
          result[colaborador_id].opcoes.push(item[3]);
        }
      }
      console.log(result); 
  
      setCoffee(Object.values(result));
    }
  }

  useEffect(()=>{
    const getAll = () =>{
      const options = {
        url: 'http://localhost:8080/coffeebreak/all',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      axios(options)
        .then(async (res) => {
          filtrado(await res.data ?? null);

      });
  }
  getAll();

  }, [])
 
  return (
    <div>
      <Header/>
      <main className="main container">
        <section className="main__coffee">

          <div>
            {coffee ??
            coffee ?
            coffee?.map((value, i) => {
              console.log(value);
              return(
                <VisualizarCoffeeBreaks key={i} proximoCoffee={"Próximo Coffee"}/>  
              )
            })
            : <h4>Não há Coffee Break marcado</h4>
          }
          </div>
          
        </section>

    </main>
    </div>  
  );
};

