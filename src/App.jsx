import { useEffect, useState } from 'react'
import './App.css'
import { useGenerator } from './hooks/useGenerator'

function App() {

  const nums = '1234567890'
  const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
  const specials = '!"#$%&/()=?¿/*-+.;:'
  const { password, generator } = useGenerator()

  const [ type, setType ] = useState([nums])
  const [ value, setValue ] = useState(16)

  const handleGenerator =(event)=>{
    event.preventDefault()
    generator(value,type)
  }

  const handleChange = ({target:{id, checked}})=>{
    console.log({id,checked})
    if(checked) setType([...type, id])
    else{
      setType(type.filter(tp=>tp!==id))
    }
  }

  const handleRange =( event )=>{
    setValue(event.target.value)
    console.log(event.target.value)    
  }


  useEffect(() => {

    generator(value,type)
  

  }, [value,type])
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (error) {
      console.error('Error al copiar la contraseña en el portapapeles', error);
    }
  };




  return (
    <>
    <h1>Generar contraseñaS</h1>
    <p>(copia con un click)</p>
    {
      password ? <h1 onClick={ handleCopy } style={{color:'#419EC4', fontSize:'1em', marginBottom:'32px', maxWidth:'90vw'}}>{ password }</h1> : ''
    }
    
    <form>
    {/* <input type="checkbox"  defaultChecked id={ nums } onChange={ handleChange }/> */}
    <input type="checkbox" id={ chars } onChange={ handleChange }/>
    <label htmlFor={ chars } > Letras </label>
    <br />
    <input type="checkbox" id={ specials } onChange={ handleChange }/>
    <label htmlFor={ specials } > Carácteres especiales </label>
    <br />
    <input type="checkbox" disabled  checked onChange={ handleChange }/>
    <label > Números (por defecto) </label>
    <p>caracteres: { value }</p>
    <input style={{marginBottom:'16px'}} type="range" min={ 8 } max={ 32 } step={ 2 } onChange={ handleRange } defaultValue={ value } />
    <br />
    <button onClick={ handleGenerator } > reintentar </button>
    </form>
    </>
  )
}

export default App
