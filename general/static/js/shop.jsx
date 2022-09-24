const imgContainerStyle = { width: "100px" };

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  render() {
    return (
      <div
        className={`alert alert-${this.props.type} alert-dismissible fade show`}
        role="alert"
      >
        <button type="button" className="close" data-dismiss="alert">
          &times;
        </button>
        {this.props.message}
      </div>
    );
  }
}
class Stars extends Component {
  render( ){
    return (
      <Stack direction="horizontal" className="justify-content-center">
        {Array(5).fill().map((_, i) =>(
          <i
            className={"fa-solid fa-star " + (i + 1 <= this.props.value ? "text-warning" : "text-secodary")}
            key={i}
            onClick={() => this.props.onClick(i + 1)}
            onMouseEnter={() => this.props.onMouseEnter(i + 1)}
          ></i>
          ))}
      </Stack>
    );
  }
}
function Review(props) {
  return (
    <Stack direction="horizontal" gap={3}>
      <div>
        <h3>{props.review.user}</h3>
        <Stars value={props.review.stars} />
      </div>
      <div>
        <p>{props.review.title}</p>
        <p>{props.review.comment}</p>
      </div>
    </Stack>
  );
}
class ReviewForm extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      title: "",
      comment: "",
      stars: 0,
      clicked: false,
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  starOnClick(value) {
    this.setState({
      stars: value,
      clicked: true
    });
  }
  starsOnMouseEnter(value) {
    !this.state.clicked ? this.setState({ stars: value }) : null;
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: this.state.title,
      comment: this.state.comment,
      stars: this.state.stars,
    };
    console.log(data)
    $.ajax({
      url: `http://127.0.0.1:8000/api/products/${this.props.product.id}/reviews/`,
      type: "POST",
      dataType: "application/json",
      headers: {
        Authorization: `Token ${this.context.auth.token}`,
        "X-CSRFToken": getCookie("csrftoken"),
      },
      data: {
        title: this.state.title,
        comment: this.state.comment,
        stars: this.state.stars,
      },
      success: (response) => {
        this.props.addReview(response);
        this.setState({
          title: "",
          comment: "",
          stars: 0,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  toggleVisible() {
    this.setState({ visible: !this.state.visible });
    this.state.visible && this.ref.current.scrollIntoView();
  }
  render() {
    if (this.context.auth) {
      const filled =
        !(!this.state.title && !this.state.comment && this.state.stars===0)
      return (
        <Form onSubmit={this.handleSubmit} className={this.props.className}>
          <Form.Group controlId="stars">
            <Form.Label>Rating</Form.Label>
            <Stars
              value={this.state.stars}
              clicked={this.state.clicked}
              onClick={(value) => this.starOnClick(value)}
              onMouseEnter={(value) => this.starsOnMouseEnter(value)}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name="title"
              type="text"
              placeholder="Enter title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              required
              name="comment"
              as="textarea"
              rows={3}
              placeholder="Enter comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type={filled ? "submit" : "button"}
            {...(filled ? {} : { disabled: true })}
          >
            Submit
          </Button>
        </Form>
      );
    } else {
      return (
        <Stack gap={2}>
          <div>
            <a
              className="d-inline"
              href="#"
              onClick={() => this.toggleVisible()}
            >
              Login{" "}
            </a>
            <p className="d-inline">to review</p>
          </div>
          <div ref={this.ref}>
            <LoginForm className={this.state.visible ? "d-block" : "d-none"} />
          </div>
        </Stack>
      );
    }
  }
}

class BasketComponents extends Component {
  static contextType = BasketContext;
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
        <Col xs={3} md={4}>
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
function Reviews (props) {
  console.log(props);
  if (props.reviews){
    return (
      <Stack gap={2}>
        {props.reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </Stack>
    );
  } else {
    return (
      <PlaceHolder/>
    );
  }
}
//TODO: Make review form, test reviews
class ProductModal extends Component {
  static contextType = AppContext;
  constructor (props) {
    super(props);
    this.state = {
      perPage: 2,
      page: 1,
      pages: 1,
      show: false,
    }
  }
  toggleShow() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const page = this.state.page;
    const perPage = this.state.perPage;
    const pages = this.state.pages;
    let reviews;
    if (!this.props.itm) {
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          size="lg"
          aria-labelledby="product-modal-title"
          centered
        >
          <Modal.Header>
            <Modal.Title id="product-modal-title">Loading...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceHolder />
          </Modal.Body>
        </Modal>
      );
    } else {
      const itm = this.props.itm;
      if (itm.reviews) {
        if (page===1){
          reviews = itm.reviews.slice(0,perPage);
        } else {
          reviews = itm.reviews.slice((page - 1) * perPage, page * perPage);
        }
      } else {
        reviews = [];
      }
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          size="lg"
          aria-labelledby="product-modal-title"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="product-modal-title">
              {itm.prod_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack gap={2} className="col-md-5 mx-auto text-center">
              <div>
                <img src={itm.img} alt={itm.prod_name + "product image"} className="rounded-circle" width={200} />
              </div>
              <Stars value={itm.average_rating} />
              <div>
                <p className="mb-0 fs-5">€{itm.price}</p>
                <p>{itm.description}</p>
              </div>
              <BasketComponents id={itm.id} amount={itm.quantity} />
              <a href="#" onClick={()=>this.toggleShow()}>
                Leave a review!
              </a>
              <ReviewForm
                product={itm}
                addReview={(review) => this.props.addReview(review)}
                className={this.state.show ? "d-block" : "d-none"}
              />
              {reviews && (
                <>
                  <Reviews reviews={reviews} />
                  <Pagination
                  className="justify-content-center"
                  size="sm"
                  >
                    <Pagination.First
                      onClick={() => this.setState({ page: 1 })}
                    />
                    <Pagination.Prev
                      onClick={() =>
                        page - 1 >= 1 && this.setState({ page: page - 1 })
                      }
                    />
                    {Array(pages)
                      .fill()
                      .map((_, i) => (
                        <Pagination.Item
                          key={i}
                          onClick={(i) => this.setState({ page: i + 1 })}
                          active={i + 1 === page}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                    <Pagination.Next
                      onClick={() =>
                        page + 1 > pages && this.setState({ page: page + 1 })
                      }
                    />
                    <Pagination.Last
                      onClick={() => this.setState({ page: pages })}
                    />
                  </Pagination>
                </>
              )}
            </Stack>
          </Modal.Body>
        </Modal>
      );
    }
  }
}

class Products extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      item: null,
      quantity: 1,
    };
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleClick(i) {
    let prod = this.context.products.find((item) => item.id === i);
    const bitm = this.context.basket.find((item) => item.id === prod.id);
    if (bitm) {
      prod.quantity = bitm.quantity
    } else {
      prod.quantity = 1
    }
    this.setState({item: prod});
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
            {products.map((item) => (
              <Col
                className="wi-fc text-center text-primary p-2"
                key={item.id}
                onClick={() => this.handleClick(item.id)}
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
          <ProductModal
            show={this.state.show}
            onClose={() => this.handleClose()}
            itm={this.state.item}
            addReview={(review) => this.addReview(review)}
          />
        </Container>
      );
    }
  }
}

class Shop extends Component {
  render() {
    return (
      <App>
        <Products />
      </App>
    );
  }
}

const element = (
  <>
    <Shop />
  </>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
