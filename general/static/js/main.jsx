const AppContext = React.createContext();
const BasketContext = React.createContext();
const AuthContext = React.createContext();

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <Dropdown.Toggle
        variant={
          !this.props.variant
            ? !this.props.as
              ? "Primary"
              : this.props.as == "Button"
              ? "Primary"
              : null
            : this.props.variant
        }
        id={this.props.id}
        as={this.props.as ? this.props.as : "Button"}
        drop={this.props.drop ? this.props.drop : "down"}
      >
        <Dropdown.Menu>{this.props.children}</Dropdown.Menu>
      </Dropdown.Toggle>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const csrftoken = getCookie("csrftoken");
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      url: "http://127.0.0.1:8000/api/login/",
      type: "POST",
      data: JSON.stringify(data),
      headers: {
        "X-CSRFToken": csrftoken,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      },
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      },
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
        <Form onSubmit={this.handleSubmit} className="px-4 py-3">
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={this.handleChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    );
  }
}

class PlaceHolder extends Component {
  render() {
    return (
      <div
        className="product col rounded bg-dark wi-fc mx-3 text-center text-primary p-2"
        aria-hidden="true"
      >
        <div>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
      </div>
    );
  }
}
class OffCanvas extends Component {
  static contextType = AppContext;
  render() {
    console.log(`Basket: ${JSON.stringify(this.context.basket)}`);
    if (this.context.basketError) {
      return <Alert type="error" message={this.context.basketError.message} />;
    } else if (!this.context.basketIsLoaded) {
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
        <Offcanvas
          show={this.context.showOc}
          onHide={this.props.onClose}
          placement="end"
          className="bg-dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Basket</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container fluid>
              <Row className="justify-content-center">
                {!this.context.basket.length > 0 && (
                  <div>
                    <p>Basket is empty</p>
                  </div>
                )}
                {this.context.basket.map((item) => (
                  <div
                    className="clearfix py-2 border-bottom border-black"
                    key={item.id}
                  >
                    <div>
                      <img
                        src={item.img}
                        alt="product image"
                        className="float-start me-2 rounded-circle"
                        width={50}
                      />
                      <span className="d-block pt-1 giBold">
                        {item.prod_name}
                      </span>
                      <span className="text-info me-2">€{item.price}</span>
                      <span className="text-primary fw-light">
                        x{item.quantity}
                      </span>
                    </div>
                    <div>
                      <span className="fw-light text-primary d-block wi-fc float-end">
                        Net Total: €{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </Row>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      );
    }
  }
}

class HeaderNavbar extends Component {
  static contextType = AppContext;
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="ms-2">
          ShopSite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
          </Nav>
          <Nav>
            {this.context.basketIsLoaded && (
              <Nav.Link as="span" onClick={this.props.onShow}>
                <i className="fa-solid fa-basket-shopping"></i> Basket
                <Badge bg="info">{this.context.basket.length}</Badge>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer py-3 bg-dark mt-auto">
        <div className="container">
          <span className="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prodError: null,
      basketError: null,
      isLoaded: false,
      showOc: false,
      basket: [],
      products: [],
      auth: JSON.parse(localStorage.getItem("auth")),
    };
  }
  componentDidMount() {
    this.getItems();
  }
  handleShow() {
    this.setState({ showOc: true });
  }
  handleClose() {
    this.setState({ showOc: false });
  }
  getItems() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/basket/",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          basket: data,
          basketIsLoaded: true,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({
          basketError: err,
          basketIsLoaded: true,
        });
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/products/",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          products: data,
          prodIsLoaded: true,
        });
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({
          prodError: err,
          prodIsLoaded: true,
        });
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <BasketContext.Provider
          value={{
            setBasket: (data) =>
              this.setState({ basket: data, basketIsLoaded: true }),
            waitBasket: () => this.setState({ basketIsLoaded: false }),
          }}
        >
          <HeaderNavbar onShow={() => this.handleShow()} />
          <OffCanvas onClose={() => this.handleClose()} />
          {this.props.children}
          <Footer />
        </BasketContext.Provider>
      </AppContext.Provider>
    );
  }
}
