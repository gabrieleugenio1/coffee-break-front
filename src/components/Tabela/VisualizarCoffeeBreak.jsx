import React from 'react';
import "./tabela.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function VisualizarCoffeeBreaks({proximoCoffee}) {

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
            <tr>
                <td data-label="Data">30/04/2023</td>
                <td data-label="Participantes">Gabriel</td>
                <td data-label="Produtos">Suco de limão,  mortadela</td>
                <td data-label="Presente"><input type="checkbox" name="check" id="check" /* onClick={()=>confirmarPresenca("")} *//></td>
            </tr>
            <tr>
                <td data-label="Data"></td>
                <td data-label="Participantes">Mica</td>
                <td data-label="Produtos">pão</td>
                <td data-label="Ações"><input type="checkbox" name="check" id="check" />{/* <Link to="/teste"><FontAwesomeIcon icon={faUserPen} size="xl" /></Link> <Link to="/teste"><FontAwesomeIcon icon={faTrash} size="xl" /></Link> */}</td>
            </tr>
        </tbody>
        </table>
    </div>
  );
};

