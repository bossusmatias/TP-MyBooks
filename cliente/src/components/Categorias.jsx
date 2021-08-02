import axios from "axios";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import CategoriaForm from "./Categoria/CategoriaForm";
import Menu from "./Navigation/menu";
import Notification from "./Notification/Notification";

export default function CategoriasList() {
  const [notificationBar, setNotificationBar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationRed, setNotificationRed] = useState();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(false);
  const [nombre, setNombre] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotificationBar(false);
    }, 10000);

    return () => clearTimeout(timeout); // CleanUp function. Se ejecuta cuando se desmonta.
  }, [notificationBar]);

  useEffect(() => {
    const myFetch = async () => {
      const result = await axios.get("http://localhost:5000/categorias/");

      if (result.status === 200) {
        setCategorias(result.data.respuesta);
      }
      setLoading(false);
    };
    myFetch();
  }, [loading]);

  const onEditarHandler = (id) => {
    setInput({ [id]: true }); // we set the input number as the OPPOSITE to show it: {5: true}
  };

  const onInputChange = (event) => {
    setNombre(event.target.value);
  };

  const onBorrarHandler = async (categoriaId) => {
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.delete(`http://localhost:5000/categorias/${categoriaId}`);
      setNotificationMessage("La categoria fue borrada");
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage(
        "La categoria no pudo ser borrada porque tiene libros asignados"
      );
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setLoading(true);
  };

  const onPutHandler = async (categoriaId) => {
    onEditarHandler(categoriaId);
    setNotificationBar(false); // this unmounts the component Notification so useEffect executes return()
    try {
      await axios.put(`http://localhost:5000/categorias/${categoriaId}`, {
        nombreCategoria: nombre,
      });
      setInput({ [categoriaId]: false }); // this closes the input
      setNotificationMessage("La categoria fue editada");
      setNotificationRed(false);
      setNotificationBar(true);
    } catch (err) {
      setNotificationMessage("La categoria no pudo ser editada");
      setNotificationRed(true);
      setNotificationBar(true);
    }
    setLoading(true);
  };

  const onNewLibroHandler = () => {
    setLoading(true);
  };

  const listaCategoria = categorias.map((categoria, index) => {
    return (
      <div key={categoria.id} className="border-b border-green-200">
        <div className="flex justify-center bg-gray-300 p-2">
          <span className="px-2 w-12">{index + 1})</span>
          <h1 className="flex-inline w-80">
            <Link to={`/libroscategoria/${categoria.id}`}>
              {categoria.nombre}- (Categoria ID: {categoria.id})
            </Link>
          </h1>
          <button
            className="bg-gray-400 text-white px-2 mx-2"
            onClick={() => onEditarHandler(categoria.id)}
          >
            Editar
          </button>
          <button
            className="bg-red-400 text-white px-2 mx-2"
            onClick={() => onBorrarHandler(categoria.id)}
          >
            Borrar
          </button>
        </div>
        {input[categoria.id] ? (
          <div className="flex justify-center p-2 bg-gray-400">
            <div>
              <input
                className="p-2"
                type="text"
                placeholder={categoria.nombre}
                name={nombre}
                value={nombre}
                onChange={onInputChange}
              ></input>
              <button
                className="p-2 bg-white hover:bg-red-400"
                onClick={() => onPutHandler(categoria.id)}
              >
                Ok
              </button>
              <button
                className="p-2 bg-white hover:bg-red-400"
                onClick={onEditarHandler}
              >
                Cancelar
              </button>
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
        <CategoriaForm onNewCategoria={onNewLibroHandler} />
        <h1 className="flex justify-center py-2 bg-green-300 font-bold">
          Categorias Ingresadas
        </h1>
        <div className="contenMain">
          {loading && <div>Cargando...</div>}
          <div>{listaCategoria}</div>
        </div>
      </div>
      {notificationBar && (
        <Notification
          message={notificationMessage}
          red={notificationRed}
          notificationBar={notificationBar}
        />
      )}
    </Fragment>
  );
}
