import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

function PersonaForm() {
  const [nombre, setNombre] = useState()
  
  const onInputChange =(event)=>{
    setNombre(event.target.value);
   
  };


  const onFormHandler = async (event) => {
    event.preventDefault(); //previene el refresh
    //aca va el codigo para guardar en base de dato
    try {
      const respuesta = await axios.post("http://localhost:5000/personas/",{nombrePersonas:nombre});
      console.log(respuesta)
      
    } catch (error) {
      console.log(error)
      
    }
    
      
    setNombre("")//limpia input
  };

  return (
    <div>
      <form onSubmit={onFormHandler}>

        <label for="nombre">Nombre</label>
        <input
          type="text"
          placeholder="Nombre de la Persona"
          name={nombre}
          value={nombre}
          onChange={onInputChange}
          id=""
        />

        <button submit>Cargar</button>
      </form>
    </div>
  );
}

export default PersonaForm;