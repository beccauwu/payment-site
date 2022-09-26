import { Component } from "react";
import Context from "../context/Context";
import { Row } from "react-bootstrap";
import { v4 } from "uuid";

class Basket extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        {!this.context.basket.length > 0 && (
          <div>
            <p>Basket is empty</p>
          </div>
        )}
        {this.context.basket.map((item) => (
          <div className="clearfix py-2 border-bottom border-black" key={v4()}>
            <div>
              <img
                src={item.img}
                alt="product image"
                className="float-start me-2 rounded-circle"
                width={50}
              />
              <span className="d-block pt-1 giBold">{item.prod_name}</span>
              <span className="text-info me-2">€{item.price}</span>
              <span className="text-primary fw-light">x{item.quantity}</span>
            </div>
            <div>
              <span className="fw-light text-primary d-block wi-fc float-end">
                Net Total: €{item.price * item.quantity}
              </span>
            </div>
          </div>
        ))}
      </Row>
    );
  }
}
Basket.contextType = Context.basket;
export default Basket;
