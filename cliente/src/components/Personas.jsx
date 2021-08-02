import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Navigation/menu";

export default function Personas() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const myFetch = async () => {
      const url = "http://localhost:5000/personas/";
      const result = await axios.get(url);
      setLoading(false);
      if (result.status === 200) {
        setPersonas(result.data.respuesta);
      }
    };
    myFetch();
  }, []);

  const listaPersonas = personas.map((persona) => {
    return (
      <div key={persona.id}>
        <div>
          <h2>
            {persona.nombre} {persona.apellido}
          </h2>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className="contenMain">
        <h1>PERSONAS INGRESADAS</h1>
        <div className="contenMain___chlid">
          {loading && <div>Cargando...</div>}
          {!loading && <div>{listaPersonas}</div>}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
