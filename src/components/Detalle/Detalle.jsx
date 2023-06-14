import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const Detalle = () => {
  const { idPais } = useParams()

  const [pais, setPais] = useState({});
  const [arrayLeng, setArrayLeng] = useState([]);
  let arrayLenguajes = [];

  useEffect(() => {
    const getPaisbyId = async () => {
        await axios.get(`${process.env.REACT_APP_BACK_URL}/paises/pais/${idPais}`).then(
          (resp) => {
            // console.log(resp)
            setPais(resp.data)
           
            for (const key in resp.data.languages) {
              arrayLenguajes.push(resp.data.languages[key]);
            }

            setArrayLeng(arrayLenguajes);
            // console.log(arrayLenguajes)
          },
          (resp) => {
            // console.log(resp.response.data);
          }
        ) 
    };

    getPaisbyId()
  }, []);

  return (
    <div>
      {pais.namecommon ? (
        <>
        <ul className="container">
            <li key={pais._id} className="card">
                <h2>{pais.namecommon}</h2>
                <img src={pais.flags.svg} height = '40px' widht = '40px' alt='{character.namecommon}'/>
                <p>Nombre Oficial: {pais.nameofficial} </p>
                <p>Capital: {pais.capital} </p>
                <p>Continente: {pais.continente}</p>
                <p>Region: {pais.region} ({pais.subregion}) </p>
                <p>Poblacion: {pais.population}</p>
                <p>Independiente: {pais.independent ? 'Si' : 'No'}</p>
                <p>Fronteras con: {pais.borders.map((eachborder) => eachborder + ' ' )  }</p>
                <p>lenguajes oficiales: {arrayLeng.map((eachLang) => eachLang + ' ' ) }</p>
            </li>
        </ul>
        </>
      ) : (
        <div className="card">
           <img src="./GIF_Mundo_Banderas.gif" height = '100px' widht = '100px' alt='loading'/>
           <p>Recuperando paises</p>
        </div>
        )
    }
    </div>
  )
}


export default Detalle