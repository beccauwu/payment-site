const AppContext = React.createContext();
const BasketContext = React.createContext();
const AuthContext = React.createContext();

const ContainerRef = React.forwardRef((props, ref) => {
    <div ref={ref} className={props.className}></div>
});

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
/**
   *
   * @param {string} variant
   * @param {string} as
   * @param {string} id
   * @param {string} drop
   * @param {string} title
   * @param {string} renderOnMount
   */
class DropDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <DropdownButton
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
        drop={this.props.drop}
        title={this.props.title}
        renderMenuOnMount={
          this.props.renderOnMount ? this.props.renderOnMount : true
        }
        menuVariant='dark'
        onClick={()=>this.props.onClick()}
      >{this.props.children}</DropdownButton>
    );
  }
}
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      error: null,
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/register/",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      success: function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <Form
        className={"py-4 px-3 " + this.props.className}
        ref={this.props.ref}
      >
        <Stack gap={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
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
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Login
          </Button>
          <a href="#" onClick={() => this.props.onClick()}>
            Register
          </a>
        </Stack>
      </Form>
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
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/login/",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      success: function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <Form
        className={"py-4 px-3 " + this.props.className}
        ref={this.props.ref}
      >
        <Stack gap={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
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
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Login
          </Button>
          <Button as="a" onClick={()=>this.props.onClick()}>Register</Button>
        </Stack>
      </Form>
    );
  }
}

class AuthForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 0,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleFormChange() {
    this.state.form == 0
      ? this.setState({ form: 1 })
      : this.setState({ form: 0 });
  }
  render() {
    return (
      <div>
        {this.state.form == 0 ? (
          <LoginForm className={this.props.className}
          onClick={()=>this.handleFormChange(1)}/>
        ) : (
          <RegisterForm className={this.props.className}
          onClick={()=>this.handleFormChange(0)}/>
        )}
      </div>
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
class Basket extends Component {
  static contextType = AppContext;
  render() {
    return (
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
class OffCanvas extends Component {
  static contextType = AppContext;
  render() {
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
              <Basket />
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      );
    }
  }
}

class HeaderNavbar extends Component {
  static contextType = AppContext;
  handleLogout(){
    localStorage.removeItem('auth');
    this.context.setAuth(null);
  }
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
            {!this.context.auth
            ? (
              <DropDown
                as={Nav.Link}
                drop="start"
                id="login-dropdown"
                title="Login"
              >
                <LoginForm />
              </DropDown>
            )
            : (
              <Nav.Link href="#" onClick={()=>this.handleLogout()}>Logout</Nav.Link>
            )
          }
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

class Footer extends Component {
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
      error: null,
      prodError: null,
      basketError: null,
      isLoaded: false,
      showOc: false,
      basket: [],
      products: [],
      auth: JSON.parse(localStorage.getItem("auth")),
      setAuth: (auth) => {
        this.setState({ auth: auth });
      }
    };
  }
  componentDidMount() {
    this.load();
  }
  handleShow() {
    this.setState({ showOc: true });
  }
  handleClose() {
    this.setState({ showOc: false });
  }
  load(){
    $.ajax({
      url: "http://127.0.0.1:8000/api/load/",
      type: "GET",
      dataType: "json",
      success: () => {
        this.getItems();
      },
      error: (error) => {
        this.setState({
          error: error,
        });
      }
    })
  }
  getItems() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/basket/",
      type: "GET",
      dataType: "json",
      success: (result) => {
        this.setState({
          basketIsLoaded: true,
          basket: result,
        });
      },
      error: (error) => {
        this.setState({
          basketIsLoaded: true,
          basketError: error,
        });
      }
    });
    $.ajax({
      url: "http://127.0.0.1:8000/api/shop/products/",
      type: "GET",
      dataType: "json",
      success: (result) => {
        this.setState({
          prodIsLoaded: true,
          products: result,
        });
      },
      error: (error) => {
        this.setState({
          prodIsLoaded: true,
          prodError: error,
        });
      }
    });
  }
  render() {
    if (this.state.error) {
      return <Alert type="error" message={this.state.error} />;
    } else {
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
}
