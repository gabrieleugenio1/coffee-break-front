import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from '../components/Header/Header';
import VisualizarCoffeeBreaks from '../components/Tabela/VisualizarCoffeeBreak';
import axios from 'axios';
import moment from 'moment/moment';
import { PulseLoader } from "react-spinners";


export default function Index() {
  const [coffee, setCoffee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function sortObjectKeysAsc(obj) {
    return Object.keys(obj).sort((a, b) => moment(a, "DD/MM/YYYY") - moment(b, "DD/MM/YYYY"));
  }

  const filtrado = (data) => {
    const participantes = {};
    const coffeePorParticipante = {};
    let coffeeAtual = null;
    let proximoCoffee = null;

    if (data != null && data !== undefined && data) {
      for (let item of data) {
        const id_data_coffee = item[0];
        const colaborador_id = item[5];
        const data_coffee = moment(item[1]).format("DD/MM/YYYY");
        const nome = item[9];
        const cpf = item[7];

        if (!participantes[cpf]) {
          participantes[cpf] = { nome, cpf };
        }

        if (!coffeePorParticipante[colaborador_id]) {
          coffeePorParticipante[colaborador_id] = {};
        }

        if (!coffeePorParticipante[colaborador_id][data_coffee]) {
          coffeePorParticipante[colaborador_id][data_coffee] = {
            data: data_coffee,
            id_data_coffee: id_data_coffee,
            participantes: [],
            produtos: [],
            presentes: [],
          };
        }

        const colaborador = participantes[cpf];
        const coffee = coffeePorParticipante[colaborador_id][data_coffee];

        if (!coffee.participantes.includes(colaborador)) {
          coffee.participantes.push(colaborador);
        }

        coffee.produtos.push(item[3]);
        coffee.presentes.push(item[11]);

        if (moment(data_coffee, "DD/MM/YYYY").isSame(moment(), "day")) {
          coffeeAtual = Object.values(coffeePorParticipante[colaborador_id])[0];
        } else if (!proximoCoffee || moment(data_coffee, "DD/MM/YYYY").isBefore(moment(proximoCoffee, "DD/MM/YYYY"))) {
          proximoCoffee = data_coffee;
        }
      }
  
      const result = {};
      for (const [participanteId, coffeeParticipante] of Object.entries(coffeePorParticipante)) {
        for (const coffeeData of Object.values(coffeeParticipante)) {
          const participantes = coffeeData.participantes.map(participante => `${participante.nome}`).join(', ');
          const presente = coffeeData.presentes.some(presente => presente) ? 'Sim' : 'Não';
          const coffeeLine = {
            data: coffeeData.data,
            id_data_coffee: coffeeData.id_data_coffee,
            participantes,
            produtos: coffeeData.produtos.map(produto => produto.charAt(0).toUpperCase() + produto.slice(1).toLowerCase()).join(', '),
            presente,
            colaborador_id: participanteId,
          };
  
          if (!result[coffeeData.data]) {
            result[coffeeData.data] = [];
          }
  
          result[coffeeData.data].push(coffeeLine);
        }
      }
  
      const orderedResult = {};
      Object.keys(result).sort((a, b) => moment(b, "DD/MM/YYYY").diff(moment(a, "DD/MM/YYYY"))).forEach(key => {
        orderedResult[key] = result[key];
      });
  
      setCoffee(orderedResult);
      setIsLoading(false);
    } else {
      setCoffee({});
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const getAll = () => {
      const options = {
        url: `${process.env.REACT_APP_BASE_URL}/coffeebreak/all`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      };
      axios(options).then(async (res) => {
        filtrado(await res.data ?? null);
      });
    };
    getAll();
  }, []);

  const fiveDaysFromToday = moment().add(5, 'days').format('DD/MM/YYYY');

  let coffeeHeader = null;
  let latestCoffeeDate = null;
  let latestCoffeeData = null;
  if (Object.keys(coffee).length === 0) {
    coffeeHeader = `Não há coffee marcado até ${fiveDaysFromToday}`;
  } else {
    const coffeeDates = sortObjectKeysAsc(coffee);
    const filteredDates = coffeeDates.filter(date => moment(date, "DD/MM/YYYY").isSame(moment(), "day") || moment(date, "DD/MM/YYYY").isAfter(moment()));
    latestCoffeeDate = filteredDates[0];
    latestCoffeeData = coffee[latestCoffeeDate];
  
    if (latestCoffeeDate) {
      const isToday = moment(latestCoffeeDate, "DD/MM/YYYY").isSame(moment(), "day");
      if (isToday) {
        coffeeHeader =  "Hoje é dia Coffee Break";
      } else {
        coffeeHeader = `O próximo coffee será no dia ${latestCoffeeDate}`;
      }
    } else {
      coffeeHeader = `Não há coffee marcado até ${fiveDaysFromToday}`;
    }
  }

  if (!latestCoffeeDate) {
    coffeeHeader = `Não há coffee marcado até ${fiveDaysFromToday}`;
  } else if (moment(latestCoffeeDate, "DD/MM/YYYY").isSame(moment(), "day")) {
    coffeeHeader = "Hoje é dia Coffee Break";
  } else {
    coffeeHeader = `O próximo coffee será ${latestCoffeeDate}`;
  }
  return (
    <div>
    <Header />
    <main className="main container">
      <section className="main__coffee">
        {     console.log(process.env.REACT_APP_BASE_URL)}
        {!isLoading ? (
          <div>
            {Object.keys(coffee).length === 0 ? (
              <h4>Não há Coffee Break até {fiveDaysFromToday}</h4>
            ) : (
              <>
                <VisualizarCoffeeBreaks
                  proximoCoffee={coffeeHeader}
                  coffee={latestCoffeeData}
                />
              </>
            )}
          </div>
        ) : (
          <div className='spinner'>
            <PulseLoader color="#123abc" loading={isLoading} size={20} />
          </div>
        )}
      </section>
    </main>
  </div>
  );
}
