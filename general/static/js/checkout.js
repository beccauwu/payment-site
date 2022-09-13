const stripe = Stripe(
  "pk_test_51JLry9GYgLaTAwa8rnnrpWENfj5VQobc318CK5EjFgGW0lQj7KxhO4MlfoIc5otmIoJfXlSuavMUj4lebpqrjydm00MTpnjm0d"
);
const basketCheckoutHTML = (img, name, id, q, p) => {
  return `
<div class="clearfix py-2 border-bottom border-black" id="checkoutBasket-${id}">
    <img class="float-start me-2 rounded-circle" src="${img}" alt="product image ${id}" width="50" />
    <span class="item-name d-block pt-1 giBold text-capitalize">${name}</span>
    <span class="item-price text-info me-2">€${p}</span>
    <span class="item-quantity fw-light text-primary">Quantity: ${q}</span>
    <span class="fa-solid fa-pen" onclick="editBasket(${id})"></span>
</div>
`;
};
const editBasketHtml = (id) => {
  return `
  <div class="my-2">
    <label for="quantity" class="form-label">Quantity</label>
    <input type="number" class="form-control" id="quantity" value="1" min="1" max="30">
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-primary mt-2" onclick="updateBasket(${id})">Update</button>
      <button type="button" class="btn btn-danger mt-2" onclick="removeBasket(${id})">Remove</button>
      <button type="button" class="btn btn-secondary mt-2" onclick="cancelEdit(${id})">Cancel</button>
    </div>
  </div>
  `;
};
let registrationHtml = `
<div class="row">
  <div class="col-12 userRegisterInputs">
    <label class="form-label" for="userInfoUsername">Username:</label>
    <input class="form-control" type="text" id="userInfoUsername" name="userInfoUsername" autocomplete="off" required>
  </div>
  <div class="col-md-6 col-sm-12 userRegisterInputs">
    <label class="form-label" for="userInfoPassword">Password:</label>
    <input class="form-control" type="password" id="userInfoPassword" name="userInfoPassword" autocomplete="off" required>
  </div>
  <div class="col-md-6 col-sm-12 userRegisterInputs">
    <label class="form-label" for="userInfoPassword2">Confirm Password:</label>
    <input class="form-control" type="password" id="userInfoPassword2" name="userInfoPassword2" autocomplete="off" required>
  </div>
</div>
`
let checkoutBasketHTML;
let client_secret;
function stripeThings(){
    if (client_secret == null) {
        setTimeout(stripeThings, 1000);
        console.log("waiting for client secret");
        return;
    }
    console.log(`client_secret: ${client_secret}`);
    const appearance = {
      theme: "stripe",
      variables: {
        colorPrimary: "#7D3BA3",
        colorBackground: "#e4a2f3",
        colorText: "#32094A",
        colorDanger: "#DD6980",
        fontFamily: "Verdana, sans-serif",
        borderRadius: "15px",
      },
      rules: {
        '.Input': {
            border: '2px solid #32094A',
        },
        '.Label': {
            fontWeight: 'bold',
        }
      }
    };

    const elements = stripe.elements({
      clientSecret: client_secret,
      appearance: appearance,
    });
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

    const form = document.getElementById("payment-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "http://127.0.0.1:8000/checkout/success/",
        },
      });

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        const messageContainer = document.querySelector("#error-message");
        messageContainer.textContent = error.message;
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    });
}
function secret (){
  $.ajax({
    url: "http://127.0.0.1:8000/api/checkout/",
    type: "GET",
    dataType: "json",
    success: function (data) {
        console.log(`secret: ${data["client_secret"]}`);
        client_secret = data["client_secret"];
    },
  });
};

function basketItems() {
  if (basketData == null || productData == null) {
    console.log("waiting for data");
    setTimeout(basketItems, 100);
    return;
  }
  let total = 0;
  Object.keys(productData).forEach(function (key) {
    const product = productData[key];
    const id = product.id;
    const basketItm = basketData[id];
    const img = product.img;
    const name = product.prod_name;
    const price = basketItm.price
    const quantity = basketItm.quantity;
    if (basketData.hasOwnProperty(id)) {
      let prod = basketCheckoutHTML(img, name, id, quantity, price);
      if (checkoutBasketHTML == null) {
        checkoutBasketHTML = prod;
      } else {
        checkoutBasketHTML += prod;
      }
      total += get_total(basketData[id].quantity, basketData[id].price);
    }
    console.log(`total: ${total}`);
    console.log(`basketHTML: ${checkoutBasketHTML}`);
    $('#basketItems').html(checkoutBasketHTML);
    $('#basketTotal').html(total);
  });
}

function stripe_main(){
    secret();
    basketItems();
    stripeThings();
}

function toggleUserForm() {
  if ($("#createAccountSwitch").is(":checked")) {
    $("#userInfo").append(registrationHtml);
  } else {
    $(".userRegisterInputs").remove();
  }
}

stripe_main();