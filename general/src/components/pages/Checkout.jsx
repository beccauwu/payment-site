import React, { Component } from "react";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../App";
import { Stack, Form, Row, Col, Button } from "react-bootstrap";
import Checkoutform from "../forms/Checkoutform";
const stripePromise = loadStripe(
  "pk_test_51JLry9GYgLaTAwa8rnnrpWENfj5VQobc318CK5EjFgGW0lQj7KxhO4MlfoIc5otmIoJfXlSuavMUj4lebpqrjydm00MTpnjm0d"
);

function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkoutform stripe={stripe} elements={elements} total={props.total} />
      )}
    </ElementsConsumer>
  );
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientSecret: null,
      total: null,
    };
  }
  componentDidMount() {
    this.getClientSecret();
  }
  getClientSecret() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/checkout/",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          clientSecret: data.client_secret,
          total: data.total,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }
  render() {
    if (!this.state.clientSecret || !this.state.total) {
      return (
        <App>
          <p>Loading...</p>
        </App>
      );
    } else {
      const options = {
        clientSecret: this.state.clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#DDA6E0",
            colorBackground: "#474747",
            colorText: "#f5a9c7",
            colorDanger: "#F07F7F",
          },
        },
      };
      return (
        <>
          <Accordion
            defaultActiveKey="0"
            className="justify-content-center col-12 col-sm-10 col-md-8 col-lg-6 p-3 mx-auto"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Basket (1/3)</Accordion.Header>
              <Accordion.Body>
                <Basket />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Your Information (2/3)</Accordion.Header>
              <Accordion.Body>
                <Basket />
              </Accordion.Body>
            </Accordion.Item>
            <Elements options={options} stripe={stripePromise}>
              <InjectedCheckoutForm total={this.state.total} />
            </Elements>
          </Accordion>
        </>
      );
    }
  }
}
Checkout.contextType = AppContext;
export default Checkout;
