import React, { useEffect, useState } from "react";
import axios from "axios";

function LibrosForm(props) {
  const [nombre, setNombre] = useState();
  const [personaId, setPersonaId] = useState();
  const [categoriaId, setCategoriaId] = useState();
  const [categorias, setCategorias] = useState([]);
  const [descripcion, setDescripcion] = useState();
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const myFetch = async () => {
      const categorias = "http://localhost:5000/categorias/";
      const personas = "http://localhost:5000/personas/";
      const result_cat = await axios.get(categorias);
      const result_per = await axios.get(personas);

      if (result_cat.status === 200) {
        setCategorias(result_cat.data.respuesta);
      }
      if (result_per.status === 200) {
        setPersonas(result_per.data.respuesta);
      }
    };
    myFetch();
  }, []);

  const onInputChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const onInputChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const onInputChangeCategoria = (event) => {
    setCategoriaId(event.target.value);
  };

  const onInputChangeUsuario = (event) => {
    setPersonaId(event.target.value);
  };

  const onNewLibroHandler = () => {
    props.onNewLibro(); // boolean TRUE/FALSE
  }

  const onFormHandler = async (event) => {
    event.preventDefault(); //previene el refresh
    try {
      await axios.post("http://localhost:5000/libros/", {
        nombre: nombre,
        description: descripcion,
        categoriaId: categoriaId,
        personaId: personaId,
      });
        onNewLibroHandler(true); // set Libros.jsx loading to true then the useEffect will set it to false
    } catch (err) {
      console.log(err.response.data); // this is to get the custom message
    }
    setNombre(""); //limpia input
  };

  return (
    <div className="flex my-2 justify-center bg-gray-300 p-4">
      <form onSubmit={onFormHandler} className="flex justify-evenly w-full">
        <input
          className="w-50 p-1"
          type="text"
          placeholder="Nombre del Libro"
          name={nombre}
          value={nombre}
          onChange={onInputChangeNombre}
        />
        <input
          className="w-50 p-1"
          type="text"
          placeholder="Descripción"
          name={descripcion}
          value={descripcion}
          onChange={onInputChangeDescripcion}
        />
        <select onChange={(e) => onInputChangeCategoria(e)}>
          <option value="">Selecciona la Categoria</option>
          {categorias.map((categoria, index) => {
            return <option value={categoria.id}>{categoria.nombre}</option>;
          })}
        </select>
        <select onChange={(e) => onInputChangeUsuario(e)}>
          <option value="">Selecciona el Usuario</option>
          {personas.map((persona, index) => {
            return (
              <option value={persona.id}>
                {persona.alias} - {persona.email}
              </option>
            );
          })}
        </select>

        <button className="bg-gray-400 px-4 border border-white" submit>Cargar</button>
      </form>
    </div>
  );
}

export default LibrosForm;