import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
       <ul className="ulNavbar">
          <li> <Link to="/"> Home </Link> </li>
          <li> <Link to="/listadoTotal"> Total Paises </Link></li>
          <li> <Link to="/listadoPaginado"> Paises por Paginas   </Link></li>
          <li> <Link to="/favoritos">Paises Favoritos </Link></li>
          <li> <Link to="/juego"> Juego Banderas   </Link></li>
          <li> <Link to="/login"> Login/registro   </Link></li>
       </ul>
   </nav>

  )
}

export default Navbar