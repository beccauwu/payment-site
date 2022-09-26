import React, { Component } from "react";
import Context from "./context/Context";
import Footer from "./nav/Footer";
import Header from "./nav/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

class App extends Component {
  render() {
      return (
        <Context>
          <Header onShow={() => this.handleShow()} />
          {this.props.children}
          <Footer />
        </Context>
      );
  }
}

const HomePage = () => {
  return (
    <App>
      <Home />
    </App>
  );
}
const ShopPage = () => {
  return (
    <App>
      <Shop />
    </App>
  );
}
const CheckoutPage = () => {
  return (
    <App>
      <Checkout />
    </App>
  );
}
export { HomePage, ShopPage, CheckoutPage };
