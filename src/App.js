import React from 'react';
//import {Products} from './components/Products.js'
import './App.css';
import ListProduct from "./components/ListProduct";
import {Link} from 'react-router-dom'
function App() {
  return (
    <div className="container mt-4">
      <div className="row">
        <Link to="/create"><button className="btn btn-primary">Nuevo producto </button></Link>
      </div>
      <div className="row">
        <ListProduct />
      </div>
    </div>
  );
}

export default App;
