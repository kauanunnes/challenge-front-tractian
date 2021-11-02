import { NavBar } from './style'
import { Link } from 'react-router-dom' 

function Nav(props) {
  return (
    <NavBar>
      <h1><Link to="/">Home</Link></h1>
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