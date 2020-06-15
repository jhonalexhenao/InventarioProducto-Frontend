import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import "../style/globalStyle.css";

const qs = require('querystring')

export default class EditProduct extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
    this.getForm = this.getForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      product: {},
    };
  }
  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
  }
  getForm(e){
    const { params } = this.props.match;
    const idProduct = params.id;
    e.preventDefault()
    console.log('data', this.state.product)
    
    if(!this.state.product.nombreProducto){
      alert("Nombre de producto es obligatorio");
      return false
    }
    if(!this.state.product.referencia){
      alert("Referencia de producto es obligatorio");
      return false
    }
    if(!this.state.product.precio){
      alert("Precio de producto es obligatorio");
      return false
    }
    if(!this.state.product.peso){
      alert("Peso de producto es obligatorio");
      return false
    }
    if(!this.state.product.categoria){
      alert("Categoria de producto es obligatorio");
      return false
    }
    if(!this.state.product.stock){
      alert("Stock de producto es obligatorio");
      return false
    }

    let data = {
      

      nombreProducto : this.state.product.nombreProducto,
      referencia : this.state.product.referencia,
      precio : this.state.product.precio,
      peso : this.state.product.peso,
      categoria : this.state.product.categoria,
      stock : this.state.product.stock
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
      console.log(res.data);      
      
      this.setState({        
        eliminado: true,
      })
      
      setTimeout(() => {
        this.setState({          
          eliminado:false
        })
      }, 3000);
    })
    .catch(e => console.log('EEROR', e))

  }
    
  handleEdit(e) {
    console.log(e.currentTarget.name)
    // aqui edit
  }
  handleDelete() {
    // aqui delete
  }
  componentDidMount(){
    const { params } = this.props.match;
    const idProduct = params.id;
    axios.get(`http://localhost/curso-laravel/inventario_producto/public/editar/`)
      .then(res => {
        const products = res.data.detalle
        const product = products.find(el => el.id == params.id );
        
        console.log('***',product )
        this.setState({product: product})
    })
    

  }

  render() {
    var self = this;
    return (
        <div className="container mt-4">
          <div className="row mb-4">
            <Link to="/"><button className="btn btn-primary">Atras </button></Link>
          </div>
          <div className="row">
            <div className="card" style={{width: "100%"}}>
              <div className="card-header">
                Editar producto
            </div>
              <form onSubmit={this.getForm} id="form-editar" className="container mt-4">
                <div className="row form-group">
                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.nombreProducto} type="text" required="true" id="nombreProducto" className="form-control" name="nombreProducto" aria-describedby="name" placeholder="Ingrese nombre del producto" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        nombreProducto: e.target.value
                        
                      }
                      })}
                      }  />
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.referencia} type="text" className="form-control" name="referencia" placeholder="Referencia" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        referencia: e.target.value
                      }
                      })}
                    } />
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.precio} type="number" className="form-control" name="precio" placeholder="Precio" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        precio: e.target.value
                      }
                      })}
                    }/>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.peso} type="number" className="form-control" name="peso" placeholder="Peso" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        peso: e.target.value
                      }
                      })}
                    }/>
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.categoria} type="text" className="form-control" name="categoria" placeholder="Categoria" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        categoria: e.target.value
                      }
                      })}
                    }/>
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.product.stock} type="number" className="form-control" name="stock" placeholder="Stock" onChange={
                      (e) => {this.setState({
                      product:{
                        ...this.state.product,
                        stock: e.target.value
                      }
                      })}
                    } />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary mb-4">Guardar</button>
               
              </form>

            </div>
              {
                this.state.eliminado &&
                <div class="alert alert-primary mx-auto" role="alert">
                Registro Actualizado! 
                 </div>
              }
          </div>
        </div>

    );
  }
}
