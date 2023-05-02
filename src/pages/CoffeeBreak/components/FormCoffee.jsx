import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { IMaskInput } from "react-imask";
import "../styles.css";
import { ValidarCPF } from "../../../utils/CPF";
import moment from "moment";
import FlashMessage from "../../../components/FlashMessage/FlashMessage";
registerLocale("pt-BR", ptBR);

export default function FormCoffee() {
  const [antigaData, setAntigaData] = useState(addDays(new Date(), 1));
  const [novaData, setNovaData] = useState();
  const [formVal, setFormVal] = useState([{ nome: "", cpf:  ""}]);
  const [FormItems, setFormItems] = useState([{ items: "" }]);
  const [msgForm, setMsgForm] = useState(true);
  const [tipoForm, setTipoForm] = useState(null);

  const [msg, setMsg] = useState('');
  const [tipo, setTipo] = useState('');
  const [alert, setAlert] = useState(false);

  // axios
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  const buscarCpf = async(cpf) => {
    options.method = "GET";
    options.url = `${process.env.REACT_APP_BASE_URL}/colaborador/encontrarCpf/${cpf}`;
    if (cpf.length === 11) {
      await axios(options)
      .then((res) => {
        if(!res.data.nome || !res.data.cpf ){
          document.getElementById("formCoffee").disabled = true;
        }else{
          document.getElementById("formCoffee").disabled = false;
        };

        let newForm = [...formVal];
        newForm[0]["nome"] = res.data.nome ?? "NÃO ENCONTRADO";
        newForm[0]["cpf"] = res.data.cpf;
        setFormVal(newForm);

      })
    }else{
      let newForm = [...formVal];
      newForm[0]["nome"] = "";
      setFormVal(newForm);
    }
  };

  const addLinha = () => {
    setFormItems([...FormItems, { items: "" }])
  };

  const removerLinha = (i) => {
    const newForm = [...FormItems];
    newForm.splice(i, 1);
    setFormItems(newForm);
  };

  const onHandleFormItems = (e, i) => {
    let newForm = [...FormItems];
    let newItem = e.target.value.trim();
    newItem = e.target.value.toLowerCase();

    if (newForm.some(item => item.items === newItem)) { 
      alert("Este item já está na lista!");
      return;
    }
    newForm[0].checaritems = ""
    newForm[i][e.target.name] = newItem;
    setFormItems(newForm);
  };
  

  const onHandleFormVal = (e, i) => {
    let newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
  };

  const formValidacao = (formVal) => {
    const data = [...formVal];
    const dataItems = [...FormItems];
    setNovaData(moment(antigaData).format("YYYY-MM-DD"));
    let valido = true;
    let validoItems = true;

    for(let index = 0; index < dataItems.length; index++){
     if(dataItems[index].items === "") {
        dataItems[index].checaritems = "Insira algum produto";
        dataItems[index].checarTamanhoitems = "";
        validoItems = false;

      } else if(dataItems[index].items?.length < 3 || !/^[a-zA-Z]/.test(dataItems[index].items)) {
        dataItems[index].checarItems = "";
        dataItems[index].checarTamanhoitems = "Insira algum produto válido";
        validoItems = false;

      }else{

        dataItems[index].checaritems = "";
        dataItems[index].checarTamanhoitems = "";
        validoItems = true;
      }
    };

    for (let index = 0; index < data.length; index++) {
      if(data[index].nome === "") {
        data[index].checarNome = "É necessário inserir um nome"
        data[index].checarTamanhoNome = ""
        valido = false

      } else if(data[index].nome?.length < 5 ) {
        data[index].checarTamanhoNome = "O nome deve ter mais de 5 caracteres"
        data[index].checarNome = ""
        valido = false
      }
      else{
        data[index].checarNome = ""
        data[index].checarTamanhoNome = ""
        valido = true
      }

      if(data[index].cpf === "" ) {
        data[index].checarCpf = "É necessário inserir um CPF"
        data[index].checarTamanhoCpf = ""
        valido = false

      } else if(data[index].cpf?.length !== 11 || !ValidarCPF(data[index].cpf)) {
        data[index].checarCpf = "CPF inválido"
        data[index].checarTamanhoCpf = ""
        valido = false

      } else {
        data[index].checarCpf = ""
        data[index].checarTamanhoCpf = ""
        valido = true
      }

      if(!data || !moment(novaData, "YYYY-MM-DD", true).isValid()){
        data[index].checarDataValida = "Data inválida"
        valido = false

      }else{
        data[index].checarDataValida = ""
        valido = true
      }
    }
    setFormVal(data);
    return {valido, validoItems};
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setTipo('');
    const {valido, validoItems} = formValidacao(formVal);
    if (valido && validoItems) {
      let items = FormItems;
      delete formVal[0].checarNome;
      delete formVal[0].checarCpf;
      delete formVal[0].checarTamanhoCpf;
      delete formVal[0].checarTamanhoNome;
      delete formVal[0].checarDataValida;
      formVal[0].data_coffee = novaData;

      for(let item of items){
        delete item.checaritems;
        delete item.checarTamanhoitems;
      }
      formVal[0].items = FormItems

      options.url = `${process.env.REACT_APP_BASE_URL}/coffeebreak/criar`;
      options.method = "POST";
      options.data = formVal[0];
      await axios(options)
        .then(  (res) => {
          setMsg(  res.data ?? "Operação feita com sucesso.");
          setMsgForm( res.data ?? "Operação feita com sucesso.");
          setTipo("sucess");
          setTipoForm("sucess");
          setAlert(true);
        })
        .catch( (err) => {
          setMsg(  err.response.data ?? "Falha ao enviar, tente novamente.");
          setMsgForm(  err.response.data ?? "Falha ao enviar, tente novamente.");
          setTipo("danger");
          setTipoForm("danger");
          setAlert(true);
        });
    }
  };
  
  useEffect(() => {
    setTipo('');
    setMsg('');
    setTimeout(() => {
      setAlert(false);
      setMsgForm(null);
      setTipoForm(null);
    }, 4000);
    return ()=> clearTimeout();
  }, [alert]);

  return (
    <>
      {true && <FlashMessage type={`${tipo}`} msg={`${msg}`}/>}
      
      {formVal.map((item, i) => (
        
        <div key={i}>
          {msgForm && <div style={{color: tipoForm === "sucess" ? "green" : "red" }}>{msgForm}</div>}
          <form className="main__formulario" onSubmit={onSubmit}>
            <label htmlFor="data">Data do Coffee Break:</label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data"
              selected={antigaData}
              onChange={(data) => setAntigaData(data)}
              startDate={addDays(new Date(), 1)}
              minDate={addDays(new Date(), 1)}
              locale="pt-BR"
              onFocus={(e) => e.target.blur()}
              disabledKeyboardNavigation
            />
            <label htmlFor="cpf">CPF:</label>
            <IMaskInput
              mask="000.000.000-00"
              unmask={true}
              required={true}
              placeholder="Digite o CPF do colaborador"
              onAccept={(value, mask) => {
                buscarCpf(value); 
              }}
            />
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={item.nome || ""}
              onChange={(e) => onHandleFormVal(e, i)}
              placeholder="Digite o nome do colaborador"
              disabled
            />

              <div className="main__formulario-novositems">
              <label htmlFor="items">Produto(s):</label>
              <div>
                {FormItems.map((item, i) => (
                  <div key={i}>
                    <input
                      type="text"
                      name="items"
                      value={item.items || ""}
                      maxLength={30}
                      onChange={(e) => onHandleFormItems(e, i)}
                      placeholder="Digite o produto" required
                    />
                    {i === 0 ? (
                      <button
                        className="main__formulario-items main__formulario-additems"
                        type="button"
                        aria-label="Acrescentar novos produtos"
                        onClick={addLinha}
                      >
                        Novo produto
                      </button>
                    ) : (
                      <button
                        className="main__formulario-items main__formulario-removeitems"
                        onClick={() => removerLinha(i)}
                      >
                        X
                      </button>
                    )}
                      <div style={{color:'red'}}>{item.checarItems}<br/>{item.checarTamanhoitems}</div>
                    </div>                  
                  ))}
                  <div style={{color:'red'}}>{item.checarNome}<br/>{item.checarTamanhoNome}</div>
                  <div style={{color:'red'}}>{item.checarCpf}<br/>{item.checarTamanhoCpf}</div>
              </div>
            </div>
       
            <button id="formCoffee" type="submit" autoFocus disabled>Clique duas vezes para criar/entrar.</button>
          </form>
        </div>
      ))}
    </>
  );
}
