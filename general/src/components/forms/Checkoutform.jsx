import React, { Component } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Stack, Row, Col, Button } from 'react-bootstrap';

export default class Checkoutform extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    console.log(event);
    console.log(this.props);
    event.preventDefault();
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8000/",
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      }
    }
  }
  render() {
    return (
      <Stack gap={3}>
        <PaymentElement />
        <Row>
          <Col xs={4} md={3}>
            <p>
              <strong>Grand Total: </strong>€{this.props.total}
            </p>
          </Col>
          <Col xs={4} md={3}>
            <Button disabled={!this.props.stripe} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Stack>
    );
  }
}
