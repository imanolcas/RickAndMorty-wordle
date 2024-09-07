
import { useEffect } from 'react'
import { CharacterContextProvider } from '../hooks/useCharacter.js'
import './App.css'
import Description from './components/Description.js'
import { Ganador } from './components/Ganador.js'
import ListaDeSeleccion from './components/ListaDeSeleccion.js'
import { Search } from './components/Search'
import { useAppContext} from './context/appContext.jsx'

function App() {

  const { cargarPersonajeDelDia, personajeDelDia, cargarDataInicial, personajesIniciales, cargarData } = useAppContext()

  useEffect(()=>{
    cargarDataInicial()
    console.log(personajesIniciales)
  }, [])
  
  useEffect(()=>{
    if(personajesIniciales.length > 0){
      cargarPersonajeDelDia()
    }
  }, [personajesIniciales])
  

  return (
    <>
    {
      personajeDelDia.length > 0 ? 
      <CharacterContextProvider>
          <Description />
          <ListaDeSeleccion />
          <Search/>
          <Ganador/>
      </CharacterContextProvider> :
      "Cargando..."
    }
      
    </>
        
  )
}

export default App