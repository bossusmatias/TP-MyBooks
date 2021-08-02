import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Categoria from './components/Categorias'
import Libros from './components/Libros'
import Personas from './components/Personas'
import LibrosCategoria from './components/LibrosCategoria';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/categorias" component={Categoria} />
        <Route path="/libros" component={Libros} />
        <Route path="/personas" component={Personas}/>
        <Route path="/libroscategoria/:id" component={LibrosCategoria}/>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
