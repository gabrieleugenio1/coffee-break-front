import { NavLink } from "react-router-dom";


export default function HeaderRotas(){
    return(
        <ul>
            <li><NavLink className={"header__nav-padding"} to="/" title="Home" >Início</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/gerenciar-coffee" title="Visualizar Coffee Breaks" >Gerenciar Coffee Breaks</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/cadastrar-colaborador" title="Cadastrar Colaborador">Cadastrar Colaborador</NavLink></li>
            <li><NavLink className={"header__nav-padding"} to="/visualizar-colaborador" title="Visualizar colaborador">Visualizar Colaboradores</NavLink></li>
        </ul>
    )
}