import { useEffect, useState } from "react";

import axios from "axios";
// import { API } from "../../services/api";

import { Link } from "react-router-dom"
import "./Listado.css"

const Listado = () => {

  const [filtroContinente, setfiltroContinente] = useState('');
  const [paises, setPaises] = useState([]);
  const [paisesContinente, setPaisesContinente] = useState([]);
  const [filtroPaises, setFiltroPaises] = useState([]);

  const addFavorite = async (id) => {
    let responseStatus = 0;

    localStorage.getItem('paisesuser');

    const data = {userfav: localStorage.getItem('paisesuser'), paisfav:id};
    const url = `${process.env.REACT_APP_BACK_URL}/favoritos`
  
    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then (response => {
      responseStatus = response.status;
      return response.json() 
    })
    .catch((error) => {
      console.log(' error petición Fetch:' + error.message)}
    )
    .then(auxdata => {
      if (responseStatus === 201)
       {
       }  
    })
    .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message)
    });
  }

  const handleFiltro = (ev) =>
  {
    let paisesFiltrados = [];

    if (filtroContinente)
     {
       paisesFiltrados = paisesContinente.filter( (eachPais) =>
         (eachPais.namecommon.toLowerCase().includes(ev.target.value.toLowerCase()))
        )  
     }  
    else
     {
       paisesFiltrados = paises.filter( (eachPais) =>
          (eachPais.namecommon.toLowerCase().includes(ev.target.value.toLowerCase()))
        )  
     }

     setFiltroPaises ([...paisesFiltrados]     )  
 } 

  useEffect(() => {
    const getPaises = async () => {
      
      // axios.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });

        await axios.get(`${process.env.REACT_APP_BACK_URL}/paises`).then(
          (resp) => {
            setPaises(resp.data);
            setPaisesContinente(resp.data);
            setFiltroPaises(resp.data);
          },
          (error) => {
            console.log(error);
          }
        ) 
        // await API.get("/paises")
        // .then((res) => {
        //     console.log(res.data)
        // })  
    };

    getPaises();
  }, []);

  const handleContinente = (event) => {
      setfiltroContinente (event.target.value);

      const paisesFiltrados = paises.filter( (eachPais) =>
          (
            eachPais.continente[0].toLowerCase().includes(event.target.value.toLowerCase())
          )
       )  
      setPaisesContinente ([...paisesFiltrados]     )  
      setFiltroPaises ([...paisesFiltrados]     )  
  }


  return (
    <div>
      {filtroPaises.length ? (
        <>
        <label htmlFor="filtro">Filtro por Pais</label>
        <input type="text" id="filtro" name="filtro" onChange={handleFiltro} />

        <select onChange={handleContinente}>
          <option value="">Seleccione Continente</option>
          <option value="Europe">Europa </option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="North America">America del Norte</option>
          <option value="South America">America del Sur</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antartida</option>
          
        </select>

        <br />

        <ul className="container">
          {filtroPaises.map((character, i) => (
            <li key={i} className="card">
                 <img src={character.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}'/>
                 <h2>{character.namecommon}</h2>
                 <p> {character.region} </p>

                 <Link to={`/detalle/${character._id}`} >Detalle</Link>

                 <button onClick={() => {
                    addFavorite(character._id)}}>Añadir Favorito</button>
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