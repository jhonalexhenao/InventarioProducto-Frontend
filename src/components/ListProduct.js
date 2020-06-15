import React, { Component } from "react";
import { product } from "../mocks/product";
import axios from 'axios';
import "../style/globalStyle.css";
import {Link} from 'react-router-dom'

const qs = require('querystring')

export default class ListProduct extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSale = this.handleSale.bind(this);
    this.state = {
      products: [{}],
      //products: product,
    };
  }

  handleDelete(e,p) {
    let url = `http://localhost/curso-laravel/inventario_producto/public/editar/${p.id}`
    console.log(url)
    console.log(p)
    axios.delete(url)
      .then(res => {
        const productsAux = this.state.products.filter(item => item.id != p.id);
        this.setState({ products: productsAux })
      })
  }

  handleSale(e, product){
    const idProduct = product.id;
    let data = {
      nombreProducto : product.nombreProducto,
      referencia : product.referencia,
      precio : product.precio,
      peso : product.peso,
      categoria : product.categoria,
      stock : product.stock,
      venta : 1
    }
console.log("data", data);
    
    const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

    const url = `http://localhost/curso-laravel/inventario_producto/public/editar/${idProduct}`

    axios.put(url, qs.stringify(data), config).then((res) => {
      
      console.log(res);
      this.setState({        
        venta: true,
      })
      
      setTimeout(() => {
        this.setState({          
          venta:false
        })
      }, 3000);
                     
    })
    .catch(e => console.log('EEROR', e))

  }

   componentDidMount(){
    axios.get(`http://localhost/curso-laravel/inventario_producto/public/registro`)
      .then(res => {
        this.setState({products:res.data.detalle})
      })
  }

  render() {
    return (
      <div className="col-12">
        <div className="my-2 title-section">Listado de productos</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Referencia</th>
              <th scope="col">Precio</th>
              <th scope="col">Peso</th>
              <th scope="col">Categoria</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.nombreProducto}</td>
                <td>{product.referencia}</td>
                <td>{product.precio}</td>
                <td>{product.peso}</td>
                <td>{product.categoria}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="d-flex">
                  <Link to={{ pathname: "/edit/" + product.id }}>
                    <img
                      name={product.id}
                      height="20px"
                      className="mx-1"
                      src="https://image.flaticon.com/icons/svg/1159/1159633.svg"
                    />
                  </Link>
                  <Link to={{ pathname: "/" }}>
                    <img
                      onClick={(event) => this.handleDelete(event, product)}
                      height="20px"
                      src="https://image.flaticon.com/icons/png/512/61/61848.png"
                    />
                  </Link>
                  <div>
                  <Link to={{ pathname: "/" }}>
                    <img
                      onClick={(event) => this.handleSale(event, product)}
                      height="20px"
                      src="https://cdn2.iconfinder.com/data/icons/solid-black-labels/128/sale_copy-512.png"
                      
                    />
                    </Link>
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
            this.state.venta &&
          <div class="alert alert-primary mx-auto" role="alert">
  {}! 
</div>
          }
      </div>
    );
  }
}