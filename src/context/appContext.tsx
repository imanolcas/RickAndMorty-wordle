import { createContext, useContext, useState } from "react";
import { ContextProps, Character, ProviderProps, PropsRequired } from './../../interfaces/personajes-interface.d';

const appContext = createContext <ContextProps> (PropsRequired);

export const useAppContext = () => useContext(appContext);

export function ContextProvider(props: ProviderProps) {
  const [personajes, setPersonajes] = useState <Character[]> ([]);
  const [personajeDelDia, setPersonajeDelDia] = useState<Character[]>([]);


  const cargarData = (search:string): void => {
    
    fetch(
      `https://rickandmortyapi.com/api/character/?name=${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        if(json.results === undefined){
          setPersonajes([])
          return
        }
        setPersonajes(json.results);
      })
      .catch((err) => console.error(err));
  };


  function cargarPersonajeDelDia():void {

    const fechaActual = new Date();
    const fechaActualString = fechaActual.toDateString();
    const fechaGuardada = window.localStorage.getItem("fechaGuardada")
    const personajeGuardado = window.localStorage.getItem("personajeGuardado")
    
    if( fechaActualString === fechaGuardada && personajeGuardado){
      try {
        const personajeDelDiaNuevo: Character[] = JSON.parse(personajeGuardado) as Character[];
        setPersonajeDelDia(personajeDelDiaNuevo);
      } catch (error) {
        console.error("Error al parsear el personaje guardado", error);
      }
    }else if(personajes.length > 0){

      const indicePersonaje = Math.floor(Math.random() * personajes.length);
      const nuevoPersonaje = [personajes[indicePersonaje]];
      setPersonajeDelDia(nuevoPersonaje);
      window.localStorage.setItem("fechaGuardada", fechaActualString)
      window.localStorage.setItem("personajeGuardado", JSON.stringify(nuevoPersonaje))
    }
  };


  return (
    <appContext.Provider value={{ 
      personajes, 
      setPersonajes, 
      cargarData, 
      personajeDelDia, 
      cargarPersonajeDelDia 
    }}>
      {props.children}
    </appContext.Provider>
  );
}
