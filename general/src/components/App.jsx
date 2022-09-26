import React, { Component } from "react";
import Context from "./context/Context";
import Footer from "./nav/Footer";
import Header from "./nav/Header";

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
export default App;
