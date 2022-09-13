const basketDropdownHTML = (img, name, id, q, p) => {
  return `
<div class="clearfix py-2 border-bottom border-black">
    <img class="float-start me-2 rounded-circle" src="${img}" alt="product image ${id}" width="50" />
    <span class="item-name d-block pt-1 giBold text-capitalize">${name}</span>
    <span class="item-price text-info me-2">€${p}</span>
    <span class="item-quantity fw-light text-primary">Quantity: ${q}</span>
</div>
`;
};
const get_total = (q, p) => {
  return parseInt(q) * parseFloat(p);
};
let basketData;
let productData;
let basketHTML;

function getBasket () {
  $.ajax({
    url: "http://127.0.0.1:8000/api/basket/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(`basketdata: ${data}`);
      basketData = data;
    },
  });
};
function getProducts () {
  $.ajax({
    url: "http://127.0.0.1:8000/api/products/",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(`productdata: ${data}`);
      productData = data;
    },
  });
};

function update_basket() {
  // wait until data available
  if (basketData == null || productData == null) {
    console.log("waiting for data");
    setTimeout(update_basket, 100);
    return;
  }
  $(".badge").text(Object.keys(basketData).length);
  let total = 0;
  Object.keys(productData).forEach(function (key) {
    const product = productData[key];
    const id = product.id;
    const basketItm = basketData[id];
    const img = product.img;
    const name = product.name;
    const price = basketItm.price
    const quantity = basketItm.quantity;
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
