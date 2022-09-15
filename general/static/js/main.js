const prodAPI = "http://127.0.0.1:8000/api/shop/products/";
const basketAPI = "http://127.0.0.1:8000/api/shop/basket/";
const get_quantity = (id) => {
  if (basketData[id] == null) {
    return 0;
  }
  return basketData[id].quantity;
};
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
let csrftoken = getCookie("csrftoken");

class AjaxGet {
  constructor(url, success, error) {
    this.url = "http://127.0.0.1:8000/api" + url;
    this.success = success;
    this.error = error;
  }
  get() {
    $.ajax({
      url: this.url,
      type: "GET",
      dataType: "json",
      success: this.success,
      error: this.error,
    });
  }
  post(data) {
    $.ajax({
      url: this.url,
      type: "POST",
      dataType: "json",
      headers: { "X-CSRFToken": csrftoken },
      data: data,
      success: this.success,
      error: this.error,
    });
  }
}

function setCookieConsen() {
  $.ajax({
    url: "http://127.0.0.1:8000/api/cookie-consent/",
    type: "POST",
    dataType: "json",
    headers: { "X-CSRFToken": csrftoken },
    data: {
      cookie_consent: true,
    },
    success: function (data) {
      console.log(data);
    },
  });
  return;
}

function getCookieConsent() {
  $.ajax({
    url: "http://127.0.0.1:8000/api/cookie-consent/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data["consent"] == true) {
        $("#cookie-consent").remove();
      }
    },
  });
}
const get_total = (q, p) => {
  return parseInt(q) * parseFloat(p);
};
const basketDropdownHTML = (img, name, id, q, p) => {
  return `
<div class="clearfix py-2 border-bottom border-black">
  <div>
    <img class="float-start me-2 rounded-circle" src="${img}" alt="product image ${id}" width="50" />
    <span class="item-name d-block pt-1 giBold text-capitalize">${name}</span>
    <span class="item-price text-info me-2">€${p}</span>
    <span class="item-quantity fw-light text-primary">Quantity: ${q}</span>
  </div>
  <div>
    <span class="item-quantity fw-light text-primary d-block wi-fc float-end">Net Total: €${get_total(q, p)}</span>
  </div>
</div>
`;
};
let basketData;
let productData;
let basketHTML;

function getBasket() {
  $.ajax({
    url: "http://127.0.0.1:8000/api/shop/basket/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(`basketdata: ${data}`);
      basketData = data;
    },
  });
}
function getProducts() {
  $.ajax({
    url: "http://127.0.0.1:8000/api/shop/products/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(`productdata: ${data}`);
      productData = data;
    },
  });
}

function update_basket() {
  // wait until data available
  if (basketData == null || productData == null) {
    console.log("waiting for data");
    setTimeout(update_basket, 100);
    return;
  }
  if (Object.keys(basketData).length == 0) {
    basketHTML = `
    <div class="dropdown-item text-center">
      <span class="text-muted">Your basket is empty</span>
    </div>
    `;
    $("#basket-items").html(basketHTML);
    $("#basket-total").text(`€0.00`);
    return;
  }
  $(".badge").text(Object.keys(basketData).length);
  let total = 0;
  Object.keys(productData).forEach(function (key) {
    const product = productData[key];
    const id = product.id;
    const basketItm = basketData[id];
    const img = product.img;
    const name = product.prod_name;
    const price = product.price;
    const quantity = get_quantity(id);
    if (basketData.hasOwnProperty(id)) {
      let prod = basketDropdownHTML(img, name, id, quantity, price);
      if (basketHTML == null) {
        basketHTML = prod;
      } else {
        basketHTML += prod;
      }
      total += get_total(basketData[id].quantity, basketData[id].price);
    }
    $("#basket-items").html(basketHTML);
    $("#basket-total").text(`€${total}`);
  });
}
function m() {
  getBasket();
  getProducts();
  update_basket();
}
m();
