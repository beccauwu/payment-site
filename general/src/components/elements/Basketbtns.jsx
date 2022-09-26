import { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Context from "../context/Context";

class Basketbtns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      quantity: props.amount,
    };
  }
  set(value) {
    this.context.waitBasket();
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/basket/" + this.state.id + "/",
      dataType: "json",
      type: "POST",
      cache: false,
      data: {
        quantity: value,
      },
      success: function (data) {
        this.context.setBasket(data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }
  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={3} md={2}>
          <Form.Control
            type="number"
            value={this.state.quantity}
            onChange={(e) => this.setState({ quantity: e.target.value })}
          />
        </Col>
        <Col xs={5} className="align-self-center">
          <Button size="sm" onClick={() => this.set(this.state.quantity)}>
            Add To Basket
          </Button>
        </Col>
      </Row>
    );
  }
}
Basketbtns.contextType = Context.basket;
export default Basketbtns;
