import React, { Component } from "react";

import { ListProduct } from "./ListProduct";
import { Createproduct } from "./CreateProduct";

export class Products extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <div className="container mt-4">
            <div className="row">
        
                <button className="btn btn-primary">Nuevo producto</button>

            </div>
            {/* <Createproduct /> */}

            <ListProduct />
        </div>
    );
  }
}
