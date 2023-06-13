import { useEffect, useState } from "react";
import axios from "axios"
import "./Listado.css"

const Listado = () => {

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const getPaises = async () => {
      // const paisesApi = await axios.get("http://localhost:5201/paises")
      const paisesApi = await axios.get("https://prjreactbk-a0cxje6gg-juanmalucas13.vercel.app/paises")
        setPaises(paisesApi.data);
        console.log(paisesApi);
    };

    setTimeout(() => {
      getPaises()
    }, 2000);

  }, []);

  return (
    <div>
      {paises.length ? (
        <ul className="container">
          {paises.map((character, i) => (
            <li key={i} className="card">
                 <img src={character.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}'/>
                 <h2>{character.namecommon}</h2>
                 <p> {character.region} </p>
            </li>

          ))}
        </ul>
      ) : (
        <div className="card">
           <img src="http://localhost:3000/GIF_Mundo_Banderas.gif" height = '100px' widht = '100px' alt='loading'/>
           <p>Recuperando paises</p>
        </div>
      )}
    </div>
  )
}

export default Listado