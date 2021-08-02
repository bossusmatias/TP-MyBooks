import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from "./Navigation/menu";

// map()
// filter()
// find()
// findIndex()
// reduce()
// some() true or false si se cumple al menos 1 vez la condicion. [12, 14, 16, 16, 9] TRUE

const LibroCategoria = () =>{
   const { id } = useParams(); // devuelve un objeto { id: 207 }
   const [librosCategoria, setLibrosCategoria] = useState([]); //undefined
   const [loading, setLoading] = useState();

   useEffect(() => {
      const myFetch = async () => {
         const result = await axios.get("http://localhost:5000/libros/");
         console.log(result);

         if (result.status === 200) {
            console.log(result.data.respuesta);
            setLibrosCategoria(result.data.respuesta);
         }
         setLoading(false);
      };
      myFetch();
      }, []);

   const librosPorCategoria = librosCategoria.filter(libro => libro.categoria_id === parseInt(id)).map(libro => <div className="bg-green-400 h-10 p-4">{libro.libro_nombre} - {libro.descripcion}</div>);
   console.log(librosPorCategoria);
   return (
      <div>
          <Menu />
          {loading && <p>Loading...</p> }
          {!loading && librosCategoria && librosPorCategoria }
      </div>
   )
}

export default LibroCategoria;