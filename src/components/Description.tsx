import { useEffect, useState } from "react"
import { useAppContext } from "../context/appContext"
import { useCharacterContext } from "../../hooks/useCharacter"
import "./description.css"

export default function Description(){

    const [ clue, setClue ] = useState<string>()
    const [ show, setShow ] = useState<boolean>(false)
    const { personajeDelDia } = useAppContext()
    const { win, characterSelect, winner, arrayOfCharacterSelect } = useCharacterContext()
    
    const handleClick = (prop:string) =>{

        const clues: Record<string, string> = {
            origin: personajeDelDia[0].origin.name,
            species: personajeDelDia[0].species,
        };

        if (clues[prop]) {
            setClue(clues[prop]);
            setShow(!show);
        }
    }



    

    useEffect(() => {
        if (characterSelect && personajeDelDia.length > 0) {
            win(personajeDelDia[0]);
        }
    }, [winner, characterSelect]);


    return(
        <div className="description">
            
            {
                winner ?
                ""
                :
           <section>
                <h3>Guess today's character</h3>
                <p>Intentos: {arrayOfCharacterSelect.length}</p>
                <div className="buttons-description">
                        <button id="originClue" onClick={() => handleClick("origin")}>ORIGIN CLUE</button>
                        <button id="speciesClue" onClick={() => handleClick("species")}>SPECIES CLUE</button>
                </div>
                
                {
                    show ? 
                    <div>
                        <p>{clue}</p>
                    </div>  :
                    "" 
                }
            </section>
            }
            
        </div>
    )
    
}