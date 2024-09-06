import { useCharacterContext } from "../../hooks/useCharacter"
import { Character } from "../../interfaces/personajes-interface"
import "./listaDeSeleccion.css"
import { useAppContext } from "../context/appContext"

export default function ListaDeSeleccion (){
    const { arrayOfCharacterSelect} = useCharacterContext()
    const { personajeDelDia } = useAppContext()


    

    return(
        <>
        {
            arrayOfCharacterSelect.length > 0 ?
            <section className="categorias">
                    <div>Character</div>
                    <div>Gender</div>
                    <div>Origin</div>
                    <div>Specie</div>
                    <div>Status</div>
                    <div>Location</div>
                    <div>Episodes</div>
                </section>
                :
                ""
        }
                <ul>
            {
                    arrayOfCharacterSelect.map((el:Character)=>{
                    
                    return(
                        <li key={el.id} className="lista-seleccion">
                            <div className="cuadrado-info">
                                <img src={el.image} alt={el.name}/>
                                <p className="cuadrado-info-nombre" >{el.name}</p>
                            </div>
                            <div className="cuadrado-info" style={personajeDelDia[0].gender === el.gender? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.gender}</div>
                            <div className="cuadrado-info" style={personajeDelDia[0].origin.name === el.origin.name? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.origin.name}</div>
                            <div className="cuadrado-info" style={personajeDelDia[0].species === el.species? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.species}</div>
                            <div className="cuadrado-info" style={personajeDelDia[0].status === el.status? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.status}</div>
                            <div className="cuadrado-info" style={personajeDelDia[0].location.name === el.location.name? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.location.name}</div>
                            <div className="cuadrado-info" style={personajeDelDia[0].episode.length === el.episode.length? {backgroundColor: "#6fe733"} : {backgroundColor:"#e73333"} }>{el.episode.length}</div>
                        </li>
                    )
                    
                    })
                }
             </ul>
             
        </>
    )
}