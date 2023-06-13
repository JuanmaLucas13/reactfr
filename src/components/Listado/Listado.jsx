import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../services/api"
import "./Listado.css"

const Listado = () => {

  const [paises, setPaises] = useState([]);
  const [filtroPaises, setFiltroPaises] = useState([]);

  const handleFiltro = (ev) =>
  {
    const paisesFiltrados = paises.filter( (eachPais) =>
        (eachPais.namecommon.toLowerCase().includes(ev.target.value.toLowerCase()))
      )  

     setFiltroPaises ([...paisesFiltrados]     )  
 } 

  useEffect(() => {
    const getPaises = async () => {
      // API.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });

      // const paisesApi = await axios.get("http://localhost:5201/paises")
      // const paisesApi = await axios.get(`${process.env.REACT_APP_BACK_URL}/paises`)
      const paisesApi = await API.get("/paises")

        setPaises(paisesApi.data);
        setFiltroPaises(paisesApi.data);
        console.log(paisesApi);
    };

    getPaises();
  }, []);

  const handleContinente = (event) => {
    // handleCategory(event.target.value);
  }


  return (
    <div>
      {filtroPaises.length ? (
        <>
        <label htmlFor="filtro">Filtro por Pais</label>
        <input type="text" id="filtro" name="filtro" onChange={handleFiltro} />

        <select onChange={handleContinente}>
          <option value="">Seleccione Continente</option>
          <option value="Eeuropa">Europa </option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Ocenia">Ocenia</option>
        </select>

        <br />

        <ul className="container">
          {filtroPaises.map((character, i) => (
            <li key={i} className="card">
                 <img src={character.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}'/>
                 <h2>{character.namecommon}</h2>
                 <p> {character.region} </p>
            </li>

          ))}
        </ul>
        </>
      ) : (
        <div className="card">
           <img src="./GIF_Mundo_Banderas.gif" height = '100px' widht = '100px' alt='loading'/>
           <p>Recuperando paises</p>
        </div>
      )}
    </div>
  )
}

export default Listado