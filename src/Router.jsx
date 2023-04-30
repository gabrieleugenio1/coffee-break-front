import {Route, Routes } from "react-router-dom";

//Páginas
import Index from './pages/Index';
import CadastroColaborador from "./pages/Colaborador/CadastroColaborador";
import VisualizarColaborador from "./pages/Colaborador/VisualizarColaboradores";
import AlterarColaborador from "./pages/Colaborador/AlterarColaborador";
import GerenciarCoffee from "./pages/CoffeeBreak/GerenciarCoffee";
import NotFound from "./components/404/NotFound";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={ <Index /> } />
            <Route path="/cadastrar-colaborador" element={ <CadastroColaborador /> }/>
            <Route path="/visualizar-colaborador" element={ <VisualizarColaborador /> }/>
            <Route path="/alterar-colaborador/:id" element={ <AlterarColaborador /> }/>
            <Route path="/gerenciar-coffee" element={ <GerenciarCoffee/> }/>
            <Route path="/*" element={<NotFound/> }  />
        </Routes>
    )
}
