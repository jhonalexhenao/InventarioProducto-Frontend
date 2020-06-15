import React, { Component } from "react";
import { Link } from "react-router-dom";
import { product } from "../mocks/product";
import "../style/globalStyle.css";
import axios from "axios";
import { Redirect } from "react-router";

const qs = require('querystring')

export default class CreateProduct extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getForm = this.getForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      products: product,
      guardo: false
    };
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  getForm(e) {
    e.preventDefault();
    if (!this.state.nombreProducto) {
      alert("Nombre de producto es obligatorio");
      return false;
    }
    if (!this.state.referencia) {
      alert("Referencia de producto es obligatorio");
      return false;
    }
    if (!this.state.precio) {
      alert("Precio de producto es obligatorio");
      return false;
    }
    if (!this.state.peso) {
      alert("Peso de producto es obligatorio");
      return false;
    }
    if (!this.state.categoria) {
      alert("Categoria de producto es obligatorio");
      return false;
    }
    if (!this.state.stock) {
      alert("Stock de producto es obligatorio");
      return false;
    }

    let data = {
      nombreProducto: this.state.nombreProducto,
      referencia: this.state.referencia,
      precio: parseInt(this.state.precio),
      peso: parseInt(this.state.peso),
      categoria: this.state.categoria,
      stock: parseInt(this.state.stock),
    };
    console.log("data", data);

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

    const url = `http://localhost/curso-laravel/inventario_producto/public/registro`

    axios.post(url, qs.stringify(data), config).then((res) => {
      console.log(res);
      console.log(res.data);
      document.querySelector('#form-guardar').reset()
      this.setState({        
        guardo: true,
      })
      
      setTimeout(() => {
        this.setState({          
          guardo:false
        })
      }, 3000);
    })
    .catch(e => console.log('EEROR', e))

    if (data) {
      return <Redirect push to="/" />;
    }
  }

  handleEdit(e) {
    console.log(e.currentTarget.name);
    // aqui edit
  }
  handleDelete() {
    // aqui delete
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row mb-4">
          <Link to={{ pathname: "/" }}>
            <button className="btn btn-primary">Atras </button>
          </Link>
        </div>
        <div className="row">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-header">Nuevo producto</div>
            <form onSubmit={this.getForm} id="form-guardar" className="container mt-4">
              <div className="row form-group">
                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="text"
                    required="true"
                    className="form-control"
                    name="nombreProducto"
                    id="nombre-producto"
                    aria-describedby="name"
                    placeholder="Ingrese nombre del producto"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="text"
                    className="form-control"
                    name="referencia"
                    placeholder="Referencia"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    placeholder="Precio"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="number"
                    className="form-control"
                    name="peso"
                    placeholder="Peso"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    placeholder="Categoria"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    placeholder="Stock"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
             
              <button type="submit" className="btn btn-primary mb-4">
                Guardar
              </button>
              
            </form>
          </div >
          {
            this.state.guardo &&
          <div class="alert alert-primary mx-auto" role="alert">
  Registro exitoso! 
</div>
          }
        </div>
      </div>
    );
  }
}
