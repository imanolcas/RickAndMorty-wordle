import { useAppContext } from './../src/context/appContext';

import { createContext, useContext, useState } from "react";
import { Character, CharacterContextProps, CharacterPropsRequired, ProviderProps } from '../interfaces/personajes-interface.d';

const characterContext = createContext <CharacterContextProps> (CharacterPropsRequired);

export const useCharacterContext = () =>{ const context = useContext(characterContext);
    if (!context) {
        throw new Error("useCharacterContext must be used within a CharacterContextProvider");
    }
    return context;
}
export function CharacterContextProvider(props: ProviderProps) {

    const [query, setQuery] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [focus, setFocus] = useState<boolean>(false);
    const [ winner, setWinner ] = useState<boolean>(false)
    // const characterSelect = useRef<Character>()
    const [characterSelect, setCharacterSelect ] = useState<Character>()
    const [arrayOfCharacterSelect, setArrayOfCharacterSelect ] = useState<Character[]>([])
    const [ personajesFiltrados, setPersonajesFiltrados ] = useState<Character[]>([])


    const { personajes } = useAppContext()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("antes", query)
        const newQuery = e.target.value;
        console.log("despues", query)
        if (newQuery.startsWith(" ")) return;
        newQuery.trim();
        setQuery(newQuery);
        personajes.sort();
        const personajesFiltradosNuevo = personajes.filter(
            el => !arrayOfCharacterSelect.some(character => character.id === el.id)
        );

        setPersonajesFiltrados(personajesFiltradosNuevo)

        if (query == " ") {
        return;
        }
        

        if (query.match(/^\d+$/)) {
        setError("No se puede buscar con un numero");
        return;
        }

        setError(null);
    }

    const handleFocus = () => {
        setFocus(true);
    };

    const handleClickBlur = () => {
        setFocus(false)
    }

    const handleClick = (e:  React.MouseEvent<HTMLButtonElement>) => {
        setFocus(false);
        const value = e.currentTarget.value
        const personajeSeleccionado: Character | undefined = personajesFiltrados.find(el => el.id == value)
        if(arrayOfCharacterSelect.length > 0 || personajeSeleccionado){
            const personajeExistente = arrayOfCharacterSelect.find(el => el.id === personajeSeleccionado?.id)
            setCharacterSelect(personajeSeleccionado)
            if(!personajeExistente && personajeSeleccionado){
                const arrayNuevo = [...arrayOfCharacterSelect, personajeSeleccionado]
                setArrayOfCharacterSelect(arrayNuevo)
                // if (!arrayLocal) {
                //     window.localStorage.setItem("characterSelects", JSON.stringify(arrayNuevo));
                // } else {
                //     const parsedArrayLocal = JSON.parse(arrayLocal);
                //     arrayNuevo = [...parsedArrayLocal, personajeSeleccionado];
                //     window.localStorage.setItem("characterSelects", JSON.stringify(arrayNuevo));
                // }
            }
        }
    
        setQuery("")
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const value = e.currentTarget.value
        const personajeSeleccionado = personajes.find(el => el.name == value)

        if(arrayOfCharacterSelect.length > 0 || personajeSeleccionado){
            const personajeExistente = arrayOfCharacterSelect.find(el => el.id === personajeSeleccionado?.id)
            setCharacterSelect(personajeSeleccionado)
            if(!personajeExistente && personajeSeleccionado){
                const arrayNuevo = [...arrayOfCharacterSelect, personajeSeleccionado]
                setArrayOfCharacterSelect(arrayNuevo)
            }
        }
        
        setQuery("")
    }


    const win = (personajeDelDia: Character) => {
        if(characterSelect?.id === personajeDelDia.id){
            setWinner(true)
            console.log(characterSelect)
        }else{
            setWinner(false)
        }
    }
    
    
    return (
        <characterContext.Provider value={{ 
           handleFocus, 
           handleClick, 
           handleSubmit, 
           handleChange, 
           error, 
           focus, 
           query, 
           characterSelect,
            win, 
            winner, 
            arrayOfCharacterSelect ,
            handleClickBlur,
            personajesFiltrados
        }}>
          {props.children}
        </characterContext.Provider>
      );
}