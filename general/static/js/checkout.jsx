
const stripePromise = Stripe(
  "pk_test_51JLry9GYgLaTAwa8rnnrpWENfj5VQobc318CK5EjFgGW0lQj7KxhO4MlfoIc5otmIoJfXlSuavMUj4lebpqrjydm00MTpnjm0d"
);
const Elements = ReactStripe.Elements;
const PaymentElement = ReactStripe.PaymentElement;
const ElementsConsumer = ReactStripe.ElementsConsumer;

class CheckoutForm extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8000/checkout/success",
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      }
    }
  };
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <Stack
            gap={3}
          >
            <PaymentElement />
            <Button disabled={!this.props.stripe}>Submit</Button>
          </Stack>
        </form>
    );
  }
}

function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}

class Checkout extends Component {
    contextType=AppContext
    constructor(props) {
        super(props);
        this.state = {
        clientSecret: null,

        };
    }
    componentDidMount() {
        this.getClientSecret();
    }
    getClientSecret() {
        $.ajax({
        url: "http://127.0.0.1:8000/api/shop/checkout/",
        dataType: "json",
        cache: false,
        success: function (data) {
            this.setState({
            clientSecret: data.client_secret,
            appearance: data.appearance,
            });
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this),
        });
    }
    render() {
        if(!this.state.clientSecret) {
            return (
            <App>
                <PlaceHolder/>
            </App>
            );
        } else {
            const options = {
            clientSecret: this.state.clientSecret,
            appearance: {
                theme: "night",
                variables: {
                    colorPrimary: "#DDA6E0",
                    colorBackground: "#474747",
                    colorText: "#f5a9c7",
                    colorDanger: "#F07F7F",
                },
            },
            };
            return (
              <App>
                <Stack
                  gap={3}
                  className="justify-content-center col-12 col-sm-10 col-md-8 col-lg-6 p-3 mx-auto"
                >
                  <Basket />
                  <Elements options={options} stripe={stripePromise}>
                    <InjectedCheckoutForm />
                  </Elements>
                </Stack>
              </App>
            );
        }
    }
}
const element = <Checkout />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
