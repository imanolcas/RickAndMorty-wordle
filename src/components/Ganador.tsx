import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useCharacterContext } from "../../hooks/useCharacter";
import "./ganador.css"
import confetti from 'canvas-confetti';

export function Ganador (){

    const { personajeDelDia } = useAppContext()

    const { win, characterSelect, winner } = useCharacterContext()


    useEffect(() => {
        if (characterSelect && personajeDelDia.length > 0) {
            win(personajeDelDia[0]);
        }
    }, [winner, characterSelect]);


const dropConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }


    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}
   

    return(
        <>
            { 
                personajeDelDia.length > 0 && winner ? 
                <section className="modal-ganador">
                        {dropConfetti()}
                        <h3>Congratulations, the character of the day is:</h3>
                        <div >
                            <img src={personajeDelDia[0].image} alt={personajeDelDia[0].name} />
                            <p>{personajeDelDia[0].name}</p>
                        </div> 
                    </section>
                    :
                    ""
            } 
        </>
    )
}