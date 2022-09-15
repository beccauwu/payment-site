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
  <div class="col-12 userRegisterInputs" id="userInfoUsernameContainer">
    <label class="form-label" for="userInfoUsername">Username:</label>
    <input class="form-control" type="text" id="userInfoUsername" name="userInfoUsername" autocomplete="off" required>
  </div>
  <div class="col-md-6 col-sm-12 userRegisterInputs">
    <label class="form-label" for="userInfoPassword">Password:</label>
    <input class="form-control" type="password" id="userInfoPassword" name="userInfoPassword" autocomplete="off" required>
  </div>
  <div class="col-md-6 col-sm-12 userRegisterInputs" id="userInfoPwd2Container">
    <label class="form-label" for="userInfoPassword2">Confirm Password:</label>
    <input class="form-control" type="password" id="userInfoPassword2" name="userInfoPassword2" autocomplete="off" required>
  </div>
  <div class="col-12">
    <button onclick="hasAccountToggle()" class="btn btn-primary mt-2 wi-fc mx-auto">Already have an account?</button>
  </div>
</div>
`;
const username = document.getElementById("userInfoUsername");
const password = document.getElementById("userInfoPassword");
const password2 = document.getElementById("userInfoPassword2");
const full_name = document.getElementById("userInfoName");
const email = document.getElementById("userInfoEmail");
const address = document.getElementById("userInfoAddress");
const city = document.getElementById("userInfoCity");
const country = document.getElementById("niceCountryInputMenuInputHidden");
const postcode = document.getElementById("userInfoPostcode");

let checkoutBasketHTML;
let client_secret;
let createuser = false;
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
    url: "http://127.0.0.1:8000/api/shop/checkout/",
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
    const price = product.price
    const quantity = get_quantity(id);
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

function stripePaymentIntentUpdate(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/shop/checkout/update/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(`secret: ${data["client_secret"]}`);
            client_secret = data["client_secret"];
        },
    });
    return
}

function stripeCustomerGetOrCreate(){
  $.ajax({
    url: "http://127.0.0.1:8000/api/shop/checkout/",
    type: "POST",
    dataType: "json",
    headers: { "X-CSRFToken": csrftoken },
    data: {
      email: email.value,
      full_name: full_name.value,
      address: {
        line1: address.value,
        city: city.value,
        country: country.value,
        postal_code: postcode.value,
      }
    },
    success: function (data) {
      console.log(data);
      stripePaymentIntentUpdate();
    },
  });
  return
}

function userCreate(){
  $.ajax({
    url: "http://127.0.0.1/api/auth/users/",
    type: "POST",
    dataType: "json",
    headers: { "X-CSRFToken": csrftoken },
    data: {
      username: username.value,
      password: password.value,
      password2: password2.value,
      email: email.value,
      profile: {
        full_name: full_name.value,
        address: address.value,
        city: city.value,
        country: country.value,
        postal_code: postcode.value,
      },
    },
    success: function (data) {
      console.log(data);
      stripePaymentIntentUpdate();
    },
  });
}

function userLogin(){
  $.ajax({
    url: "http://127.0.0.1:8000/api/auth/login/",
    type: "POST",
    dataType: "json",
    headers: { "X-CSRFToken": csrftoken },
    data: {
      username: username.value,
      password: password.value,
    },
    success: function (data) {
      console.log(data);
      stripePaymentIntentUpdate();
    },
  });
}

function clickDetails() {
  $("#detailsBtn").click();
  $('#basketInfoBtn').click()
}

function stripeCheckoutNoAccount() {
  if ($("#stripeCheckoutNext").children("#spinner").length == 0){
    $('#stripeCheckoutNext').prepend(spinner)
    stripeCustomerGetOrCreate();
    $("#stripeCheckoutNext").children("#spinner").remove();
    $("#stripeCheckoutBtn").prop("disabled", false).click();
    $('#detailsBtn').click();
  }
}

function stripeCheckoutLogin() {
  if ($("#stripeCheckoutNext").children("#spinner").length == 0){
    $('#stripeCheckoutNext').prepend(spinner)
    userLogin();
    $("#stripeCheckoutNext").children("#spinner").remove();
    $("#stripeCheckoutBtn").prop("disabled", false).click();
    $('#detailsBtn').click();
  }
}

function stripeCheckoutCreateAccount(){
  if ($("#stripeCheckoutNext").children("#spinner").length == 0){
    $('#stripeCheckoutNext').prepend(spinner)
    userCreate();
    $("#stripeCheckoutNext").children("#spinner").remove();
    $("#stripeCheckoutBtn").prop("disabled", false).click();
  }
}

function toggleUserForm() {
  if ($("#createAccountSwitch").is(":checked")) {
    $("#userInfo").append(registrationHtml);
    $('#stripeCheckoutNext').attr('onclick', 'stripeCheckoutCreateAccount()');
  } else {
    $(".userRegisterInputs").remove();
    $('#stripeCheckoutNext').attr('onclick', 'stripeCheckoutNoAccount()');
  }
}

function hasAccountToggle(){
  if ($("#userInfoUsernameContainer").hasClass('col-md-6')){
    $("#userInfoUsernameContainer").removeClass('col-md-6');
    $('#stripeCheckoutNext').attr('onclick', 'stripeCheckoutLogin()');
  } else {
    $("#userInfoUsernameContainer").addClass('col-md-6');
    $("#stripeCheckoutNext").attr("onclick", "stripeCheckoutCreateAccount()");
  }
}

function stripe_main() {
  secret();
  basketItems();
  stripeThings();
}

stripe_main();
