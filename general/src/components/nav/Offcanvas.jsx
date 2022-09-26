import React, { Component } from "react";
import { Offcanvas, Container, Row, Col } from "react-bootstrap";
import {contexttypes} from "../context/Context";
import Placeholder from "../elements/Placeholder";
import Basket from "../elements/Basket";

class BasketOffcanvas extends Component {
  render() {
    if (this.context.basketError) {
      return <Alert type="error" message={this.context.basketError.message} />;
    } else if (!this.context.basketIsLoaded) {
      return (
        <Row>
          <Col>
            <Placeholder />
          </Col>
          <Col>
            <Placeholder />
          </Col>
        </Row>
      );
    } else {
      return (
        <Offcanvas
          show={this.context.show}
          onHide={this.props.onClose}
          placement="end"
          className="bg-dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Basket</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container fluid>
              <Basket />
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      );
    }
  }
}
BasketOffcanvas.contextType = contexttypes.app;
export default BasketOffcanvas;
