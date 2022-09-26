import React, { Component } from "react";
import Context from "../context/Context";
import PlaceHolder from "../elements/Placeholder";
import Prodmodal from "../elements/Prodmodal";
import { Button, Row, Col, Container, Dropdown, Alert } from "react-bootstrap";
import { v4 } from "uuid";

//TODO: Make review form, test reviews

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      item: null,
      quantity: 1,
      sort: 0,
      open: false,
    };
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleClick(i) {
    let prod = this.context.products[i];
    const bitm = this.context.basket.find((item) => item.id === prod.id);
    if (bitm) {
      prod.quantity = bitm.quantity;
    } else {
      prod.quantity = 1;
    }
    prod.index = i;
    prod.out_of = this.context.products.length - 1;
    this.setState({ item: prod });
    this.handleShow();
  }
  addReview(review) {
    let prod = this.context.products.find((item) => item.id === review.product);
    prod.reviews.push(review);
    prod.average_rating =
      (prod.average_rating + review.stars) / prod.reviews.length;
    this.setState({
      item: prod,
    });
  }
  render() {
    const products = this.context.products;
    if (this.context.prodError) {
      return <Alert type="error" message={this.context.prodError.message} />;
    } else if (!this.context.prodIsLoaded) {
      return (
        <Row>
          <Col>
            <PlaceHolder />
          </Col>
          <Col>
            <PlaceHolder />
          </Col>
        </Row>
      );
    } else {
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12}>
              <Dropdown>
                <Dropdown.Toggle
                  size="sm"
                  drop="down"
                  title="Sort by"
                  className="float-end giBold"
                >
                  Sort by{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                  {[
                    [0, "prod_name", "Name"],
                    [1, "price", "Price"],
                    [2, "average_rating", "Rating"],
                  ].map((item) => (
                    <React.Fragment key={v4()}>
                      <Dropdown.Item
                        as={Button}
                        onClick={() => {
                          this.setState({ sort: item[0], open: false });
                          this.context.sort(item[1], "asc");
                        }}
                        className={
                          this.state.sort === item[0]
                            ? "text-black giBold active"
                            : "text-light"
                        }
                      >
                        {item[2] + " (ascending)"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Button}
                        onClick={() => {
                          this.setState({ sort: item[0] + 3, open: false });
                          this.context.sort(item[1], "desc");
                        }}
                        className={
                          this.state.sort === item[0] + 3
                            ? "text-black giBold active"
                            : "text-light"
                        }
                      >
                        {item[2] + " (descending)"}
                      </Dropdown.Item>
                    </React.Fragment>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            {products.map((item, i) => (
              <Col
                className="wi-fc text-center text-primary p-2"
                key={v4()}
                onClick={() => this.handleClick(i)}
              >
                <div className="description mx-auto">
                  <img
                    className="d-block mx-auto rounded-circle"
                    src={item.img}
                    alt="product image"
                    width={100}
                  />
                </div>
                <div className="text-center">
                  <h3 className="giBold">{item.prod_name}</h3>
                  <p className="text-light">€{item.price}</p>
                </div>
              </Col>
            ))}
          </Row>
          <Prodmodal
            show={this.state.show}
            onClose={() => this.handleClose()}
            itm={this.state.item}
            addReview={(review) => this.addReview(review)}
            switchProduct={(i) => this.handleClick(i)}
          />
        </Container>
      );
    }
  }
}
Shop.ContextType = Context.app;
export default Shop;
