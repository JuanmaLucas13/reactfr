import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favoritos = (id) => {
  const [paises, setPaises] = useState([]);
  const [recarga, setRecarga] = useState(0);
  const [errorPag, setErrorPag] = useState(0);
  const [msgError, setMsgError] = useState([]);

  const delFavorite = async (id) => {
    let responseStatus = 0;

    const url = `${process.env.REACT_APP_BACK_URL}/favoritos/${id}`
  
    await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then (response => {
      responseStatus = response.status;
      return response.json() 
    })
    .catch((error) => {
      console.log(' error petición Fetch:' + error.message)}
    )
    .then(auxdata => {
      setRecarga(recarga + 1);
    })
    .catch(error => {
       console.log('Hubo un problema con la petición Fetch:' + error.message)
    });
  }


  useEffect(() => {
    const getPaises = async () => {
      setErrorPag(0)

      // axios.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });
        const id = localStorage.getItem('paisesuser');
        await axios.get(`${process.env.REACT_APP_BACK_URL}/favoritos/${id}`).then(
          (resp) => {
            setPaises(resp.data);
            setErrorPag(0);
            // console.log(resp.data)
          },
          (resp) => {
            setErrorPag(1);
            setPaises([]);
            setMsgError(resp.response.data);
            // console.log(resp.response.data);
          }
        ) 
    };

    getPaises();
  }, [recarga]);

  return (
    <div>
      {paises.length ? (
        <>
        <ul className="container">
          {paises.map((character, i) => (
            <li key={i} className="card">
                 <img src={character.paisfav.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}'/>
                 <h2>{character.paisfav.namecommon}</h2>
                 <p> {character.paisfav.region} </p>

                 <Link to={`/detalle/${character._id}`} >Detalle</Link>

                 <button onClick={() => {
                    delFavorite(character._id)}}>Eliminar Favorito</button>
            </li>
          ))}
        </ul>
        </>
      ) : (
        (errorPag === 1 ?
          
          <div className="card">
           <p>No hay favoritos seleccionados</p>
          </div>
        :
        <div className="card">
           <img src="./GIF_Mundo_Banderas.gif" height = '100px' widht = '100px' alt='loading'/>
           <p>Recuperando paises</p>
        </div>
        )
      )}
    </div>
  )
}

export default Favoritos