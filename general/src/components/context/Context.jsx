import React from 'react';
import { Component } from 'react';
const AppContext = React.createContext();
const BasketContext = React.createContext();

export const contexttypes = {
    app: AppContext,
    basket: BasketContext
};

export default class Context extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      prodError: null,
      basketError: null,
      isLoaded: false,
      showOc: false,
      basket: [],
      products: [],
      preLoad: JSON.parse(localStorage.getItem("preLoad")),
      sort: (prop, dir) => this.sortProducts(prop, dir),
    };
  }
  componentDidMount() {
    this.load();
  }

  handleShow() {
    this.setState({ showOc: true });
  }
  handleClose() {
    this.setState({ showOc: false });
  }
  sortProducts(prop, dir) {
    let sorted;
    if (dir === "asc") {
      sorted = this.state.products.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
      this.setState({ products: sorted });
    } else if (dir === "desc") {
      sorted = this.state.products.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
      this.setState({ products: sorted });
    }
  }
  load() {
    const now = new Date().getDate();
    if (this.state.preLoad) {
      this.state.preLoad.next > now
        ? this.setState({
            products: this.state.preLoad.products,
            basket: this.state.preLoad.basket,
            isLoaded: true,
          })
        : this.setState({ preLoad: null });
    } else {
      const next = new Date(now).setDate(now + 1);
      $.ajax({
        url: "http://127.0.0.1:8000/api/load/",
        type: "GET",
        dataType: "json",
        success: () => {
          this.getItems(now, next);
        },
        error: (error) => {
          this.setState({
            error: error,
          });
        },
      });
    }
  }
  getItems(now, next) {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/basket/",
      type: "GET",
      dataType: "json",
      success: (result) => {
        this.setState({
          basketIsLoaded: true,
          basket: result,
        });
      },
      error: (error) => {
        this.setState({
          basketIsLoaded: true,
          basketError: error,
        });
      },
    });
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/products/",
      type: "GET",
      dataType: "json",
      success: (result) => {
        this.setState({
          prodIsLoaded: true,
          products: result,
        });
      },
      error: (error) => {
        this.setState({
          prodIsLoaded: true,
          prodError: error,
        });
      },
    });
    localStorage.setItem(
      "preLoad",
      JSON.stringify({
        time: now,
        next: next
      })
    );
  }
  render() {
    if (this.state.error) {
      return <Alert variant="danger">{this.state.error.responseText}</Alert>;
    } else {
      return (
        <AppContext.Provider value={this.state}>
          <BasketContext.Provider
            value={{
              setBasket: (data) =>
                this.setState({ basket: data, basketIsLoaded: true }),
              waitBasket: () => this.setState({ basketIsLoaded: false }),
            }}
          >
            {this.props.children}
          </BasketContext.Provider>
        </AppContext.Provider>
      );
    }
  }
}
