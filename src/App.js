import './styles/App.css';

import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/Navbar/Navbar';
import Home from '../src/components/Home/Home';
import Listado from '../src/components/Listado/Listado'
import Paginacion from '../src/components/Paginacion/Paginacion'
import Login from '../src/components/Login/Login'
import Juego from './components/Juego/Juego';
import Favoritos from './components/Favoritos/Favoritos';


function App() {
  return (
    <div className="App">
     <NavBar />
     <Routes>
       <Route path= '/' element = {<Home />} />
       <Route path= '/listadoTotal' element = {<Listado />} />
       <Route path= '/listadoPaginado' element = {<Paginacion />} />
       <Route path= '/favoritos' element = {<Favoritos />} />
       <Route path= '/juego' element = {<Juego />} />
       <Route path= '/login' element = {<Login />} />
     </Routes>

    </div>
  );
}

export default App;
