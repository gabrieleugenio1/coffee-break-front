import React, { useState } from 'react';
import "./tabela.css";
import axios from 'axios';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function VisualizarCoffeeBreaks({proximoCoffee, coffee}) {

    const [coffeeList, setCoffeeList] = useState(coffee);

    const confirmarPresenca = (id_colaborador, data_coffee, id_coffee) => {
        const url = `${process.env.REACT_APP_BASE_URL}/coffeebreak/marcarpresenca/${id_colaborador}/${id_coffee}`;
        console.log(url)
        axios.put(url, { presente: true })
          .then(response => {
            console.log(response.data);
            const updatedCoffeeList = coffeeList.map(item => {
              if (item.colaborador_id === id_colaborador && item.data === moment(data_coffee).format("DD/MM/YYYY")) {
                return {
                  ...item,
                  presente: "Sim"
                };
              } else {
                return item;
              }
            });
            setCoffeeList(updatedCoffeeList);
          })
          .catch(error => {
            console.error(error);
          });
    };

    function handleCheckboxChange(id_colaborador, data_coffee, id_coffee) {
        const dataEvento = moment(data_coffee, "DD/MM/YYYY").format("YYYY-MM-DD");
        const hoje = moment().format("YYYY-MM-DD");
        if (dataEvento === hoje) {
            if (window.confirm("Deseja confirmar a presença?")) {
                confirmarPresenca(id_colaborador, dataEvento, id_coffee);
            }
        } else {
            alert("A presença só pode ser confirmada no dia.");
        }
    };
    

    return (
      <div className='tabela'>
      <table className='colaboradores__tabela'> 
        <caption>{proximoCoffee ?? "Coffee Break"}</caption>
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Participantes</th>
            <th scope="col">Produtos</th>
            <th scope="col">Presente</th>
          </tr>
        </thead>
        <tbody>
          {coffeeList && Array.isArray(coffeeList) && coffeeList.map((item, i) => (
            <tr key={i}>
              <td data-label="Data">{item.data}</td>
              <td data-label="Participantes">{item.participantes}</td>
              <td data-label="Produtos">{item.produtos}</td>
              <td data-label="Presente">
              {item.presente === "Não" && moment(item.data, "DD/MM/YYYY").isBefore(moment(), "day") ? (
                  <FontAwesomeIcon icon={faTimesCircle} color="red" />
                  ) : item.presente === "Sim" ? (
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
              ) : (
                  moment(item.data, "DD/MM/YYYY").isSame(moment(), "day") ? (
                      <button className='btn_confirmar-presenca' onClick={()=>handleCheckboxChange(item.colaborador_id, item.data, item.id_data_coffee)}>Confirmar presença</button>
                  ) : (
                      <span>A presença só pode ser confirmada no dia.</span>
                  )
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
    
}
