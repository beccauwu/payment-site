const imgContainerStyle = {width: '100px',}

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }
  render() {
    return (
      <div className={`alert alert-${this.props.type} alert-dismissible fade show`} role="alert">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        {this.props.message}
      </div>
    );
  }
}
function Stars(props) {
  console.log(props.value);
  return (
    <Stack direction="horizontal" className="justify-content-center">
      {Array.from(Array(5)).map((e, i) => {
        <i
          className={`fa-regular fa-star ${
            i + 1 >= props.value ? "text-warning" : "text-secodary"
          }`}
          key={i}
          onClick={() => props.onClick(i + 1)}
          onMouseEnter={() => props.onMouseEnter(i + 1)}
          onMouseLeave={() => props.onMouseLeave()}
        ></i>;
      })}
    </Stack>
  );
}
function Review (props) {
    return (
      <Row>
        <Col xs={2}>
          <h3>
            {props.review.user.username}
          </h3>
          <Stars value={props.review.stars} />
        </Col>
        <Col xs={10}>
          <p>{props.review.title}</p>
          <p>{props.review.comment}</p>
        </Col>
      </Row>
    );
}

class ReviewForm extends Component {
  static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            comment: null,
            stars: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    starOnClick(value) {
        this.setState({stars: value});
    }
    starsOnMouseEnter(value) {
        this.setState({stars: value});
    }
    starsOnMouseLeave() {
        this.setState({stars: 0});
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            title: this.state.title,
            comment: this.state.comment,
            stars: this.state.stars,
        };
        $.ajax({
            url: `http://127.0.0.1:8000/api/products/${this.props.product.id}/reviews/`,
            type: 'POST',
            dataType: 'application/json',
            headers: {
                'Authorization': `Token ${this.context.auth.token}`,
                'X-CSRFToken': getCookie('csrftoken'),
            },
            data: JSON.stringify(data),
            success: (response) => {
                this.props.addReview(response);
                this.setState({
                    title: '',
                    comment: '',
                    stars: 0,
                });
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
    render() {
      if (this.context.auth) {
        const filled =
          (this.state.title && this.state.comment && this.state.stars) !== null;
        return (
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Group controlId="stars">
              <Form.Label>Stars</Form.Label>
              <Stars
                value={this.state.stars}
                onClick={(value) => this.starOnClick(value)}
                onMouseEnter={(value) => this.starsOnMouseEnter(value)}
                onMouseLeave={this.starsOnMouseLeave}
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
          <DropDown
          as="a"
          title="Login"
          id="login-dropdown"
          >
            <LoginForm/>
          </DropDown>
        );
      }
    }
}

class BasketComponents extends Component {
  static contextType = BasketContext;
  constructor (props) {
    super(props);
    this.state = {
      id: props.id,
      quantity: props.amount,
    };
  }
  set(value) {
    console.log(this.state.quantity);
    this.context.waitBasket();
    $.ajax({
        url: 'http://127.0.0.1:8000/api/shop/basket/'+this.state.id+'/',
        dataType: 'json',
        type: 'POST',
        cache: false,
        data: {
          quantity: value,
        },
        success: function(data) {
            this.context.setBasket(data);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }
  render() {
      return (
          <Row className="justify-content-center">
            <Col xs={3}>
              <Form.Control type="number" value={this.state.quantity} onChange={(e) => this.setState({quantity: e.target.value})}/>
            </Col>
            <Col xs={5} className="align-self-center">
              <Button size="sm" onClick={()=>this.set(this.state.quantity)}>Add To Basket</Button>
            </Col>
          </Row>
      );
  }
}
//TODO: Make review form, test reviews
class ProductModal extends React.Component {
  static contextType = AppContext;
  render(){
    const product = this.props.product;
    console.log(`ProductModal: ${JSON.stringify(product)}`);
    if (product === null) {
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
          <PlaceHolder/>
        </Modal.Body>
      </Modal>
      )
    } else {
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
              {product.prod_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack gap={2} className="col-md-5 mx-auto text-center">
              <div>
                <img src={product.img} className="rounded-circle" width={200} />
              </div>
              <Stars value={product.average_rating} />
              <div>
                <p className="mb-0 fs-5">€{product.price}</p>
                <p>{product.description}</p>
              </div>
              <BasketComponents id={product.id} amount={product.quantity} />
              {product.reviews &&
                product.reviews.map((review) => (
                  <Review review={review} key={review.id} />
                ))}
                {
                  auth == 'false' &&
                  <ReviewForm product={product} addReview={(review)=>this.props.addReview(review)} />
                }
            </Stack>
          </Modal.Body>
        </Modal>
      );
    }
  }
}

class Products extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      item: null,
      quantity: 1,
    };
  }
  handleShow(){
    this.setState({show: true});
  }
  handleClose(){
    this.setState({show: false});
  }
  handleClick(i){
    let prod = this.context.basket.find(
      item => item.id === i
    )
    if (prod === undefined) {
      prod = this.context.products.find(
        item => item.id === i
      )
      prod.quantity = 1;
    } else {
      let product = this.context.products.find(
        item => item.id === i
      )
      prod.reviews = product.reviews;
      prod.average_rating = product.average_rating;
    }
    this.setState({
      item: prod,
    });
    this.handleShow();
  }
  addReview(review) {
    let prod = this.context.products.find(
      item => item.id === review.product
    )
    prod.reviews.push(review);
    prod.average_rating = (prod.average_rating + review.stars) / prod.reviews.length;
    this.setState({
      item: prod,
    });
  }
  render() {
    const products = this.context.products;
    console.log(`context: ${JSON.stringify(this.context)}`);
    if (this.context.prodError) {
        return <Alert type='error' message={this.context.prodError.message} />;
    } else if (!this.context.prodIsLoaded) {
        return (
          <Row>
            <Col>
              <PlaceHolder/>
            </Col>
            <Col>
              <PlaceHolder/>
            </Col>
          </Row>
        );
    } else {
        return (
          <Container fluid>
            <Row className="justify-content-center">
              {products.map(item => (
                <Col className="wi-fc text-center text-primary p-2" key={item.id} onClick={()=>this.handleClick(item.id)}>
                      <div className="description mx-auto">
                          <img className="d-block mx-auto rounded-circle"
                          src={item.img} alt="product image" width={100} />
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
              onClose={()=>this.handleClose()}
              product={this.state.item}
              addReview={(review) => this.addReview(review)}
            />
          </Container>
        );
      }
    }
}

class Shop extends React.Component {
  render() {
    return (
      <App>
        <Products/>
      </App>
    );
  }
}

const element = (
  <>
    <Shop/>
  </>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
