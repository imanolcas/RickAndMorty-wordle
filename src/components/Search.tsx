import { useEffect} from "react";
import { useAppContext } from "../context/appContext";
import { Character } from "./../../interfaces/personajes-interface.d";
import { useCharacterContext } from './../../hooks/useCharacter';
import "./search.css"

export function Search() {
  const { personajes, cargarData, setPersonajes, cargarPersonajeDelDia} = useAppContext();

  const { focus, query, handleChange, handleFocus, handleClick, handleSubmit, error, winner, personajesFiltrados} = useCharacterContext()

  useEffect(() => {
    if(query === "") setPersonajes([])
    cargarData(query);
  }, [query]);


  useEffect(() => {
    cargarPersonajeDelDia();
  }, []);
  

  
  return (
    <>
    {
      winner ? "" :
        <form onSubmit={e => handleSubmit(e)} className="search">
        <div>
          <input
          type="text"
          placeholder="Escribe un nombre"
          onChange={handleChange}
          onFocus={handleFocus}
          value={query}
          className="search-input"
          />
          
          <button type="submit" className="search-button">Submit</button>
        </div>
        

        <p style={{ color: "red" }}>{error}</p>
        {focus ?
        <div>
           {personajes.length > 0 ? (
            <ul className="search-characters">
               {
                personajesFiltrados.map((el: Character) => {
                  return (
                    <li key={el.id} style={{ listStyle: "none"}} >
                    <button value={el.id} onClick={handleClick}>
                      <img
                        src={el.image}
                        alt={el.name}
                      />
                      <p>{el.name}</p>
                    </button>
                    </li>
                  );
                })
              } 
                
              
            </ul>
          ) : (
          
            <p>No se encuentra ese personaje</p>
          ) 
        }
          </div>
          :
           ""
        }
      </form>
      }
    </>
  );
}
