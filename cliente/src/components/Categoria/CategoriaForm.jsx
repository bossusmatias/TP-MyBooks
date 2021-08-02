import axios from "axios";
import React, { useState, useEffect } from "react";
import Notification from "../Notification/Notification";

function CategoriaForm(props) {
  const [nombre, setNombre] = useState();
  const [notificationBar, setNotificationBar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationRed, setNotificationRed] = useState();

  useEffect(() => {
    const timeout = 
      setTimeout(() => {
        setNotificationBar(false);
      }, 10000);
    
    return () => clearTimeout(timeout);   // CleanUp function    
  }, [notificationBar]);

  const onInputChange = (event) => {
    setNombre(event.target.value);
  };

  const onNewCategoriaHandler = () => { //sube al nivel de Categorias.jsx para cambiar el loading to TRUE y ejecutar un useEffect y ver la nueva lista
    props.onNewCategoria(); // boolean TRUE/FALSE
  }

  const onFormHandler = async (event) => {
    event.preventDefault(); //previene el refresh
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.post("http://localhost:5000/categorias/", { nombreCategoria: nombre});
      onNewCategoriaHandler(); // esta funcion vuelve a cargar la lista de categorias
      setNotificationMessage('La categoria fue agregada');
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage(err.response.data.error);
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setNombre(""); //limpia input
  };

  return (
    <div className="flex my-2 justify-center bg-gray-300 p-4">
      <form onSubmit={onFormHandler} className="flex justify-center w-full">
        <input
          className="w-50 p-1"
          type="text"
          placeholder="Nombre de la Categoria"
          name={nombre}
          value={nombre}
          onChange={onInputChange}
        />

        <button className="ml-8 bg-gray-400 px-4 border border-white" submit>Cargar</button>
        <button className="ml-8 bg-gray-400 px-4 border border-white" onClick={()=>onNewCategoriaHandler()}>Recargar</button>
      </form>
      {notificationBar && <Notification message={notificationMessage} red={notificationRed} notificationBar={notificationBar}/>}
    </div>
  );
}

export default CategoriaForm;