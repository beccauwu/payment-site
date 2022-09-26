import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useRouteMatch,
} from "react-router-dom";
import App from './App'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Shop from './pages/Shop'

export default class Main extends Component {
  render() {
    return (
      <App>
        <Home/>
      </App>
    );
  }
}
