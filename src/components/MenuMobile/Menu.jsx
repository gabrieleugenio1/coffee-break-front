import { Container } from "./styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";


export default function MenuMobile({menuIsVisible, setMenuIsVisible}){
    
    useEffect(() => {
        document.body.style.overflow = menuIsVisible ? 'hidden' : 'auto';
      }, [menuIsVisible]);
      
    return(
        <Container isVisible={menuIsVisible}>
            <FontAwesomeIcon icon={faXmark} size="xl" onClick={()=>setMenuIsVisible(false)}/>
            <nav>
                    <ul className="nav_mobile-list">
                        <li><NavLink className={"header__nav-padding"} to="/" title="Home" >Início</NavLink></li>
                        <li><NavLink className={"header__nav-padding"} to="/gerenciar-coffee" title="Visualizar Coffee Breaks" >Gerenciar Coffee Breaks</NavLink></li>
                        <li><NavLink className={"header__nav-padding"} to="/cadastrar-colaborador" title="Cadastrar Colaborador">Cadastrar Colaborador</NavLink></li>
                        <li><NavLink className={"header__nav-padding"} to="/visualizar-colaborador" title="Visualizar colaborador">Visualizar Colaboradores</NavLink></li>
                    </ul>
                </nav>
        </Container>
    )
}