import { createContext, useContext, useState } from "react";
import {
  ContextProps,
  Character,
  ProviderProps,
  PropsRequired,
} from "./../../interfaces/personajes-interface.d";

const appContext = createContext<ContextProps>(PropsRequired);

export const useAppContext = () => useContext(appContext);

export function ContextProvider(props: ProviderProps) {
  const [personajes, setPersonajes] = useState<Character[]>([]);
  const [personajesIniciales, setPersonajesIniciales] = useState<Character[]>(
    []
  );
  const [personajeDelDia, setPersonajeDelDia] = useState<Character[]>([]);

  const cargarDataInicial = () => {
    const arrayDeLetras = [
      "a",
      "s",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "ñ",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
    ];
    const numeroAleatorio: number = Math.floor(
      Math.random() * arrayDeLetras.length
    );
    const letraAleatoria: string = arrayDeLetras[numeroAleatorio];

    fetch(`https://rickandmortyapi.com/api/character/?name=${letraAleatoria}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.results === undefined) {
          setPersonajesIniciales([]);
          throw new Error("No se encuentra la busqueda");
        }else{
        setPersonajesIniciales(json.results);
        }
      })
      .catch((err) => console.error(err));
  };

  const cargarData = (search: string): void => {
    if (search == "") return;
    fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.results === undefined) {
          setPersonajes([]);
          return;
        }
        setPersonajes(json.results);
      })
      .catch((err) => console.error(err));
  };

  function cargarPersonajeDelDia(): void {
    const fechaActual = new Date();
    const fechaActualString = fechaActual.toDateString();
    const fechaGuardada = window.localStorage.getItem("fechaGuardada");
    const personajeGuardado = window.localStorage.getItem("personajeGuardado");

    if (fechaActualString === fechaGuardada && personajeGuardado) {
      try {
        const personajeDelDiaNuevo: Character[] = JSON.parse(
          personajeGuardado
        ) as Character[];
        setPersonajeDelDia(personajeDelDiaNuevo);
      } catch (error) {
        console.error("Error al parsear el personaje guardado", error);
      }
    } else if (personajesIniciales.length > 0) {
      const indicePersonaje = Math.floor(Math.random() * personajesIniciales.length);
      const nuevoPersonaje = [personajesIniciales[indicePersonaje]];
      setPersonajeDelDia(nuevoPersonaje);
      window.localStorage.setItem("fechaGuardada", fechaActualString);
      window.localStorage.setItem(
        "personajeGuardado",
        JSON.stringify(nuevoPersonaje)
      );
    }
  }

  return (
    <appContext.Provider
      value={{
        personajes,
        setPersonajes,
        cargarData,
        personajeDelDia,
        cargarPersonajeDelDia,
        cargarDataInicial,
        personajesIniciales,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
}
