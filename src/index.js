import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'

ReactDOM.render(
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/create" component={CreateProduct} />
    <Route path="/edit/:id" component={EditProduct} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
