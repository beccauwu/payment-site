import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import ReactFlagsSelect from "react-flags-select";
import { Submitbtn } from "../elements/Buttons";

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        country: "SE",
        email: "",
        full_name: "",
        city: "",
        address: "",
        postcode: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
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
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <ReactFlagsSelect
            selected={this.state.country}
            onSelect={(code) => this.setState({ country: code })}
            />
          <Submitbtn onClick={this.handleSubmit}/>
        </Form>
      </Stack>
    );
  }
}
