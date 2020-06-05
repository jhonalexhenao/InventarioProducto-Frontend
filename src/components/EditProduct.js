import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { product } from "../mocks/product";
import "../style/globalStyle.css";

export default class EditProduct extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
    this.getForm = this.getForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      products: product,
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
    e.preventDefault()
    if(!this.state.nombreProducto){
      alert("Nombre de producto es obligatorio");
      return false
    }
    if(!this.state.referencia){
      alert("Referencia de producto es obligatorio");
      return false
    }
    if(!this.state.precio){
      alert("Precio de producto es obligatorio");
      return false
    }
    if(!this.state.peso){
      alert("Peso de producto es obligatorio");
      return false
    }
    if(!this.state.categoria){
      alert("Categoria de producto es obligatorio");
      return false
    }
    if(!this.state.stock){
      alert("Stock de producto es obligatorio");
      return false
    }

    let data = {
      nombreProducto : this.state.nombreProducto,
      referencia : this.state.referencia,
      precio : this.state.precio,
      peso : this.state.peso,
      categoria : this.state.categoria,
      stock : this.state.stock
    }
    console.log(data)

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
    const data = this.state.products.find(el => el.id == params.id )
    this.setState({
      nombreProducto:data.nombreProducto,
      categoria:data.categoria,
      peso:data.peso,
      precio:data.precio,
      referencia:data.referencia,
      stock:data.stock,
    })
    // axios.get(`http://localhost/curso-laravel/inventario_producto/public/registro`)
    //   .then(res => {
        
    //     console.log('de axios',res)
    //   })
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
              <form onSubmit={this.getForm} className="container mt-4">
                <div className="row form-group">
                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.nombreProducto} type="text" required="true" className="form-control" name="nombreProducto" aria-describedby="name" placeholder="Ingrese nombre del producto" onChange={this.handleChange}  />
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.referencia} type="text" className="form-control" name="referencia" placeholder="Referencia" onChange={this.handleChange} />
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.precio} type="number" className="form-control" name="precio" placeholder="Precio" onChange={this.handleChange}/>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.peso} type="number" className="form-control" name="peso" placeholder="Peso" onChange={this.handleChange}/>
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.categoria} type="number" className="form-control" name="categoria" placeholder="Categoria" onChange={this.handleChange}/>
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-12 data-required">
                    <input value={this.state.stock} type="number" className="form-control" name="stock" placeholder="Stock" onChange={this.handleChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mb-4">Guardar</button>
              </form>
            </div>
          </div>
        </div>

    );
  }
}
