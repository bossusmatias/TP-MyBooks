import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PersonasList() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myFetch = async () => {
      const url = "http://localhost:5000/personas/";
      const result = await axios.get(url);
      console.log(result);
      setLoading(false);
      if (result.status === 200) {
        setPersonas(result.data.respuesta);
      }
    };
    myFetch();
  }, []);

  const onBorrarHandler = (categoriaId) => {
    console.log("borrando", categoriaId); //logica para borrar
  };

  const listaPersonas = personas.map((persona) => {
    return (
      <div key={persona.id}>
        <div>
          <h2>
            {persona.nombre} {persona.apellido}-
            <button onClick={() => onBorrarHandler(persona.id)}>Borrar</button>
          </h2>
        </div>
      </div>
    );
  });

  return (
    <div className="contenMain">
      <h1>PERSONAS INGRESADAS</h1>
      <div className="contenMain___chlid">
        {loading && <div>Cargando...</div>}
        {!loading && <div>{listaPersonas}</div>}
      </div>
      <div className="footer">
        <Link to="/libros">Ir a Libros</Link>
        <Link to="/categorias">Ir a Categorias</Link>
        <Link to="/personas">Ir a Personas</Link>
        <Link to="/">Ir al Home</Link>
      </div>
    </div>
  );
}
