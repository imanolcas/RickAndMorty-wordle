
import { Character } from './personajes-interface.d';
interface origin {
    name: string
    url: string
}
interface location {
  name: string
  url: string
}

export interface Character{
    id: string
    name: string
    image: string
    species: string
    gender: string
    status: string
    origin: origin
    location: location
    episode: []
}

export interface CharacterOfTheDay{
  id: string
  name: string
  image: string
  species: string
  gender: string
  status: string
  origin: origin
  location: location
  episode: []

}

export interface ProviderProps {
    children: ReactNode;
  }
  
export interface ContextProps {
    personajes: Character[];
    setPersonajes: React.Dispatch<React.SetStateAction<Character[]>>;
    cargarData: (string) => void;
    cargarPersonajeDelDia: () => void;
    personajeDelDia: Character[];
    cargarDataInicial: () => void
    personajesIniciales: Character[];
    // setPersonajeDelDia: React.Dispatch<React.SetStateAction<CharacterOfTheDay[]>>;
  }

export const PropsRequired = {
    personajes: [],
    setPersonajes: () => {},
    cargarData: () => {},
    cargarPersonajeDelDia: () => {},
    personajeDelDia: [],
    setPersonajeDelDia: () => {},
    cargarDataInicial: () => {},
    personajesIniciales: []

}

export interface CharacterContextProps{
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void; 
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void; 
  handleClickBlur: () => void; 
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null; 
  focus: boolean; 
  query: string;
  characterSelect: Character | undefined;
  win: (personajeDelDia: Character) => void;
  winner: boolean;
  arrayOfCharacterSelect: Character[];
}

export const CharacterPropsRequired = {
  handleFocus: () => {},
  handleClick: () => {},
  handleClickBlur: () => {},
  handleSubmit: () => {},
  handleChange: () => {},
  win: () => {},
  error: undefined as string,
  focus: undefined as boolean,
  query: undefined as string,
  winner: undefined as boolean,
  characterSelect: {} as Character,
  arrayOfCharacterSelect: [] as Character[]
}
  

