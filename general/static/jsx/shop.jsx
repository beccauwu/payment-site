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
    return (
      <Row className="justify-content-center">
        {
          Array.from({length: props.value}, (_, i) =>
            <i className="fa-solid fa-star text-warning" key={i}></i>
          )
        }
        {
          Array.from({length: 5 - props.value}, (_, i) =>
            <i className="fa-regular fa-star text-secondary" key={i}></i>
          )
        }
      </Row>
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
class BasketComponents extends React.Component {
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
            <Stack gap={3} className="col-md-5 mx-auto text-center">
              <div>
                <img src={product.img} className="rounded-circle" width={200}/>
              </div>
              <div>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
              <Stars value={product.average_rating}/>
              <BasketComponents
              id={product.id}
              amount={product.quantity}
              />
              {
                product.reviews.map(review =>
                  <Review review={review} key={review.id}/>
                )
              }
            </Stack>
          </Modal.Body>
        </Modal>
      )
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
      prod.reviews = [];
      prod.average_rating = 0;
    }
    this.setState({
      item: prod,
    });
    this.handleShow();
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
root.render(element);
