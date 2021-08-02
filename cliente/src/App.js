import { Link } from "react-router-dom";
import Menu from './components/Navigation/menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <Link to="/libros">Ir a Libros</Link>
      <Link to="/categorias">Ir a Categorias</Link>
      <Link to="/personas">Ir a Personas</Link>
    </div>
  );
}

export default App;
