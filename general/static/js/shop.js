const prodAPI = "http://127.0.0.1:8000/api/products/";
const basketAPI = "http://127.0.0.1:8000/api/basket/";
const prodhtml = (img, name, id) => {
  return `
<div class="product col rounded bg-light wi-fc text-center">
    <div class="description mx-auto" style="width:100px;">
        <img class="d-block mx-auto rounded-circle" src="${img}" alt="product image" width="100">
    </div>
    <div class="text-center">
        <p class="d-inline giBold">${name}</p>
    </div>
    <p class="d-inline giBold">in basket:</p>
    <div class="input-group">
        <span class="input-group-btn">
            <button type="button" onclick="subtract_basket(${id})" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                <span class="fa-solid fa-minus"></span>
            </button>
        </span>
        <input type="text" id="basket-counter-${id}" value="0" max="100" onchange="set_basket(${id})" class="d-inline giBold form-control counter"></input>
        <span class="input-group-btn">
            <button type="button" onclick="add_basket(${id})" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <span class="fa-solid fa-plus"></span>
            </button>
        </span>
    </div>
    <button onclick="add_basket(${id})" id="basket-add-${id}" class="btn btn-sm btn-primary">Add to cart</button>
</div>
`;
};
let allprods;
let products;
function get() {
  $.getJSON(prodAPI, function (results) {
    products = results;
    console.log(results);
    $.each(results, function (index) {
      let prod = prodhtml(
        results[index].img,
        results[index].name,
        results[index].id
        );
      if (allprods == null) {
        allprods = prod;
      } else {
      allprods += prod;
        }
      $("#products").html(allprods);
    });
  });
}
function resizeInput() {
  $(this).attr("size", $(this).val().length);
}
function add_basket(id) {
    $.ajax({
        url: basketAPI + id,
        type: "POST",
        success: function (data) {
        $("#basket-counter-" + id).val(String(data[id].quantity));
        }
    });
}

function subtract_basket(id) {
    $.ajax({
        url: basketAPI + id,
        type: "POST",
        data: { 'subtract': 'True' },
        success: function (data) {
        $("#basket-counter-" + id).val(String(data[id].quantity));
        }
    });
}

function set_basket(id) {
    $.ajax({
        url: basketAPI + id,
        type: "POST",
        data: { 'quantity': $("#basket-counter-" + id).val() },
        success: function (data) {
        $("#basket-counter-" + id).val(String(data[id].quantity));
        }
    });
}
function get_basket() {
  $.ajax({
    url: basketAPI,
    type: "GET",
    success: function (results) {
        console.log(results);
      $(results).each(function (keyName, keyValue) {
        console.log(keyName, keyValue);
        $("#basket-counter-" + keyName).val(String(keyValue.quantity));
      });
    },
  });
}

$('input[type="text"]').keyup(resizeInput).each(resizeInput);

function main() {
  get();
  get_basket();
}
main();
