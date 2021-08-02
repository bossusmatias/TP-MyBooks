import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import LibrosForm from "./Libros/LibrosForm";
import Menu from "./Navigation/menu";
import Notification from "./Notification/Notification";

export default function LibrosList() {
  const [notificationBar, setNotificationBar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationRed, setNotificationRed] = useState();
  const [libros, setLibros] = useState([]);
  const [personas, setPersonas] = useState();
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState();
  const [input, setInput] = useState(true);
  const [inputPrestar, setInputPrestar] = useState(true);
  const [personaId, setPersonaId] = useState(true);

  useEffect(() => {
    const myFetch = async () => {
      const url1 = "http://localhost:5000/libros/";
      const result1 = await axios.get(url1);
      console.log(result1.data.respuesta);
      if (result1.status === 200) {
        setLibros(result1.data.respuesta);
      }

      const url2 = "http://localhost:5000/personas/";
      const result2 = await axios.get(url2);

      if (result2.status === 200) {
        setPersonas(result2.data.respuesta);
      }
      setLoading(false);
    };
    myFetch();
  }, [loading]);

  const onInputDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onEditarHandler = (id) => { // we set the input number as true
    setInput({ [id] : true }); 
  };

  const onBorrarHandler = async (libroId) => {
    await axios.delete(`http://localhost:5000/libros/${libroId}`);
    setLoading(true);
  };

  const onPrestarHandler = (id) => {
    setInputPrestar({ [id] : true }); // we set the input number as true
  };  

  const setPrestadoPersonaId = (e) => {
    setPersonaId(e.target.value);
  }

  const onPutPrestarHandler = async (libroId, personaId) => {
    console.log({input}, libroId, personaId);
    setInputPrestar();
    onPrestarHandler();
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.put(`http://localhost:5000/libros/prestar/${libroId}`, ({ personaId: personaId}));
      setNotificationMessage('El libro ha sido prestado');
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage('El libro no pudo ser prestado');
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setLoading(true);
  }

  const onDevolverHandler = async  (categoriaId) => {
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.put(`http://localhost:5000/libros/devolver/${categoriaId}`);
      setNotificationMessage('El libro fue devuelto');
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage('El libro no pudo ser devuelto');
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setLoading(true);
  }

  const onPutEditarHandler = async (libroId, personaId, categoriaId) => {
    onEditarHandler();
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.put(`http://localhost:5000/libros/${libroId}`, { personaId: personaId, description: description, categoriaId: categoriaId  });
      setInput({ [libroId] : false }); // this closes the input
      setNotificationMessage('El libro fue editado');
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage('El libro no pudo ser editado');
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setLoading(true);
  };
  
  const onNewLibroHandler = () => {
    setLoading(true);
  }

  const listaLibros = libros.map((libro, index) => {
    return (
        <div key={libro.libro_id} className="bg-gray-300 p-2">
          <h2 className="bg-green-400 bg-opacity-10 p-2">
            <span className="px-2 w-12">{index+1})</span>
            {libro.libro_nombre} - {libro.alias && <span className="text-green-700">({libro.alias})</span>} 
            <button className="bg-green-400 text-white px-2 mx-2" onClick={() => onEditarHandler(libro.libro_id)}>Editar</button>
            {libro.alias && <button className="bg-green-600 text-white px-2 mx-2" onClick={() => onDevolverHandler(libro.libro_id)}>Devolver</button>}
            {!libro.alias && <button className="bg-green-600 text-white px-2 mx-2" onClick={() => onPrestarHandler(libro.libro_id)}>Prestar</button>}
            <button className="bg-red-400 text-white px-2 mx-2" onClick={() => onBorrarHandler(libro.libro_id)}>Borrar</button>
          </h2>
          <h4 className="pt-2 pl-10 text-gray-500">Descripcion: {libro.descripcion}</h4>

          {input[libro.libro_id] ? (
            <div className="flex justify-center p-2 bg-gray-400" >
              <div>
                 <input
                  className="p-2"
                  type="text"
                  placeholder={libro.description}
                  name={description}
                  value={description}
                  onChange={onInputDescriptionChange}
                 />
                <button className="p-2 bg-white hover:bg-red-400" onClick={()=>onPutEditarHandler(libro.libro_id, libro.persona_id, libro.categoria_id)}>Ok</button>
                <button className="p-2 bg-white hover:bg-red-400" onClick={onEditarHandler}>Cancelar</button>
              </div>
            </div>
          ) : null}

          {inputPrestar[libro.libro_id] ? (
            <div className="flex justify-center p-2 bg-gray-400" >
              <div className="bg-white p-4">
                <span className="p-4">Prestar a:</span>
                <select className="p-2" onChange={(e)=>setPrestadoPersonaId(e)}>
                  {personas.map(persona => {
                    return <option value={persona.id}>{persona.nombre}</option>
                  })}
                </select>
                <button className="p-2 bg-white hover:bg-red-400" onClick={()=>onPutPrestarHandler(libro.libro_id, personaId)}>Ok</button>
                <button className="p-2 bg-white hover:bg-red-400" onClick={onPutPrestarHandler}>Cancelar</button>
              </div>
            </div>
          ) : null}
        </div>
    );
  });

  return (
    <Fragment>
      <Menu />
      <div className="mt-20 m-4 flex flex-col w-8/12 mx-auto">
        <LibrosForm onNewLibro={onNewLibroHandler}/>
        <h1 className="flex justify-center py-2 bg-green-300 font-bold">Libros Prestados</h1>
        <div className="bg-gray-100">
          {loading && <div className="flex juxtify-center">Cargando....</div>}
          {listaLibros}
        </div>
      </div>
      {notificationBar && <Notification message={notificationMessage} red={notificationRed} notificationBar={notificationBar}/>}
    </Fragment>
  );
}
