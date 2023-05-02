import React, {useState, useEffect} from 'react';
import "./tabela.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import {  Link  } from 'react-router-dom';
import { nameTitle } from '../../utils/nameTitle';
import { mascaraCPF } from '../../utils/CPF';
import axios from 'axios';

export default function VisualizarColaborador({colaboradores, setTipo, setMsg}) {

  const [alert, setAlert] = useState(false);

  const apagarColaborador = (id) => {
    const confirmacao = window.confirm("Deseja realmente apagar este colaborador?");
    if (confirmacao) {
      const options = {
        url: `${process.env.REACT_APP_BASE_URL}/colaborador/deletar/${id}`,
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      axios(options)
        .then(async(res) => {
          setTipo("sucess");
          setMsg(res.data);
          setAlert(true);
          setTimeout(()=>window.location.reload(),2000);

        }).catch(async(err) => {
          setTipo("danger");
          setMsg(err ?? "Serviço indisponível");
          setAlert(true);
        });
     }
  }


   useEffect(()=>{
    setTimeout(()=>{
      setAlert(false)
    }, 3000);
  }, [alert])

  return (<>
    <div className='colaboradores'>
    <table className='colaboradores__tabela'> 
        <caption>Colaboradores</caption>
        <thead>
            <tr>
            <th scope="col">Nome do colaborador</th>
            <th scope="col">CPF</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
        {colaboradores.length > 0 ? (colaboradores?.map((item) => {
            return(
              <tr key={item.id}>
                <td data-label="Nome do colaborador">{nameTitle(item.nome)}</td>
                <td data-label="CPF">{mascaraCPF(item.cpf)}</td>
                <td data-label="Ações">
                  <Link to={`/alterar-colaborador/${item.id}`} state={item}><FontAwesomeIcon icon={faUserPen} size="xl" /></Link> 
                  <FontAwesomeIcon onClick={()=>apagarColaborador(item.id)} icon={faTrash} size="xl" />
                </td>
              </tr>
            )
          })):        
          <tr>
            <td data-label="Nome do colaborador" colSpan={3}>Não há colaborador cadastrado</td>
          </tr>
        }
        </tbody>
        </table>
    </div>
    </>
  );
};

