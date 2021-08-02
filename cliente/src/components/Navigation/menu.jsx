import { Link } from "react-router-dom";

const Menu = () => {
   return(
      <div className="fixed top-0 left-0 w-full flex justify-evenly bg-blue-100 p-4">
         <Link to="/" className="bg-white px-2 transform hover:scale-125 border border-black">Ir al Home</Link>
         <Link to="/libros" className="bg-white px-2 transform hover:scale-125 border border-black">Ir a Libros</Link>
         <Link to="/categorias" className="bg-white px-2 transform hover:scale-125 border border-black">Ir a Categorias</Link>
         <Link to="/personas" className="bg-white px-2 transform hover:scale-125 border border-black">Ir a Personas</Link>
    </div>
   );
}

export default Menu;