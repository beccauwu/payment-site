const stripePromise = Stripe.loadStripe("pk_test_51JLry9GYgLaTAwa8rnnrpWENfj5VQobc318CK5EjFgGW0lQj7KxhO4MlfoIc5otmIoJfXlSuavMUj4lebpqrjydm00MTpnjm0d");
const Elements = ReactStripe.Elements
const PaymentElement = ReactStripe.PaymentElement
const ElementsConsumer = ReactStripe.ElementsConsumer

class CheckoutForm extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const {stripe, elements} = this.props;
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:8000/checkout/success"
            }
        });
        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === "succeeded") {
                console.log("Payment succeeded!");
            }
        }
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <PaymentElement />
                <Button disabled={!this.props.stripe}>Submit</Button>
            </form>
        )
    }
}

function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientSecret: null,
            appearance: {
                theme: 'stripe',
            },
        }
    }
    componentDidMount() {
        this.getClientSecret();
    }
    getClientSecret() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/checkout/',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState(
                    {
                        clientSecret: data.client_secret,
                        appearance: data.appearance,
                    });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render(){
        const options = {
            clientSecret: this.state.clientSecret,
            appearance: this.state.appearance
        }
        return (
          <App>
            <Elements options={options} stripe={stripePromise}>
              <InjectedCheckoutForm />
            </Elements>
          </App>
        );
    }
}
const element = (
    <Checkout />
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
