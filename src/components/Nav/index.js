import { NavBar } from './style'
import { Link } from 'react-router-dom' 

function Nav() {
  return (
    <NavBar>
      <h1><Link to="/">Início</Link></h1>
      <ul>
        <li><Link to="/assets">Ativos</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/companies">Empresas</Link></li>
        <li><Link to="/units">Unidades</Link></li>
      </ul>
    </NavBar>
  )
}

export default Nav