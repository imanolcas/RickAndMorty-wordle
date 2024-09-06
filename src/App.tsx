
import { useEffect } from 'react'
import { CharacterContextProvider } from '../hooks/useCharacter.js'
import './App.css'
import Description from './components/Description.js'
import { Ganador } from './components/Ganador.js'
import ListaDeSeleccion from './components/ListaDeSeleccion.js'
import { Search } from './components/Search'
import { ContextProvider, useAppContext} from './context/appContext.jsx'
// import { contextProvider, useAppContext } from './context/appContext'

function App() {

  const { cargarPersonajeDelDia } = useAppContext()

  useEffect(()=>{
    cargarPersonajeDelDia()
  }, [])

  return (
    <>
      <CharacterContextProvider>
          <Description />
          <ListaDeSeleccion />
          <Search/>
          <Ganador/>
      </CharacterContextProvider>
    </>
        
  )
}

export default App