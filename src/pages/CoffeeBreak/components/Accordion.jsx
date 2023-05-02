import { useState, useEffect } from "react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import seta from "./seta.svg";
import styles from "./styles.module.css";
import FormCoffee from "./FormCoffee";
import VisualizarCoffeeBreaks from "../../../components/Tabela/VisualizarCoffeeBreak";
import moment from "moment";
import axios from "axios";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={seta} alt="Seta" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default function App() {
  const [coffee, setCoffee] = useState({});

  const filtrado = (data) => {
    const participantes = {};
    const coffeePorParticipante = {};
  
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

    } else {
      setCoffee({});


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

  return (
    <div className={styles.app}>
      <Accordion transition transitionTimeout={200}>
        <AccordionItem header="Criar Coffee Break ou Entrar no Coffee Break" initialEntered>
            <FormCoffee />
        </AccordionItem>

        <AccordionItem header="Visualizar todos Coffee Break">
        {Object.keys(coffee).length === 0 ? (
              <h4>Não há Coffee Break cadastrado</h4>
            ) : (
              Object.keys(coffee).map((data_coffee, i) => (
                <div key={i}>
                    <VisualizarCoffeeBreaks
                    proximoCoffee={data_coffee}
                    coffee={coffee[data_coffee]}
                  />
                </div>
              ))
            )}
        </AccordionItem>
    
      </Accordion>
    </div>
  );
}
