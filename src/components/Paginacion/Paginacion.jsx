import { useEffect, useState } from "react";
import axios from "axios";
import "../Listado/Listado.css"

const Paginacion = () => {
  const [paisesPag, setPaisesPag] = useState([]);
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState(null);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [paginaAct, setPaginaAct] = useState('/Paginacion');

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setPaginaAct(previousPage);
    }
  };
  
  const handleNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
      setPaginaAct(nextPage);
    }
  };
  
  useEffect(() => {
    const getPaisesPag = async () => {
      
      // axios.interceptors.request.use(config => {
      //   const token = localStorage.getItem("paisestoken");
      //   config.headers["Authorization"] = `Bearer ${token}`;
      //   return config;
      // });

      const paisesApi = await axios.get(`${process.env.REACT_APP_BACK_URL}/paises${paginaAct}`)
      setPaisesPag(paisesApi.data.results);
      setPages(Math.floor((paisesApi.data.info.numPaises / paisesApi.data.info.limit)) + 
      (paisesApi.data.info.numPaises % paisesApi.data.info.limit ? 1 : 0));

      setNextPage(paisesApi.data.info.nextPage)
      setPreviousPage(paisesApi.data.info.previusPage)
      setPage(paisesApi.data.info.page)   
    };

    getPaisesPag();
  }, [paginaAct]);


  return (
    <div>
      {paisesPag.length ? (
        <>
        <ul className="container">
          {paisesPag.map((character, i) => (
            <li key={i} className="card">
                 <img src={character.flags.svg} height = '20px' widht = '20px' alt='{character.namecommon}'/>
                 <h2>{character.namecommon}</h2>
                 <p> {character.region} </p>
            </li>

          ))}
        </ul>
        <button onClick={() => {
             handlePreviousPage()
           }}>Previous</button>

        <span> Page {page} </span>

        <button onClick={() => {
            handleNextPage()}}>Next</button>
        </>
      ) : (
        <div className="card">
           <img src="./GIF_Mundo_Banderas.gif" height = '100px' widht = '100px' alt='loading'/>
           <p>Recuperando paises</p>
        </div>
      )}
    </div>

  );
};

export default Paginacion