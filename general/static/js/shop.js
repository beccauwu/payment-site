const prodAPI = "http://127.0.0.1:8000/api/products/";
const basketAPI = "http://127.0.0.1:8000/api/basket/";
const prodhtml = (img, name, id, q, s) => {
  return `
<div class="product col rounded bg-light wi-fc text-center">
    <div class="description mx-auto" style="width:100px;">
        <img class="d-block mx-auto rounded-circle" src="${img}" alt="product image" width="100">
    </div>
    <div class="text-center">
        <p class="d-inline giBold">${name}</p>
    </div>
    <div class="input-group wi-fc mx-auto">
        <span class="input-group-btn">
            <button type="button" onclick="subBasket(${id})" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">
                <span class="fa-solid fa-minus"></span>
            </button>
        </span>
        <input type="text" size="${s}" id="basket-counter-${id}" value="${q}" max="100" onchange="setBasket(${id})"
            class="d-inline text-center giBold form-control counter" style="flex:none;width:fit-content;"></input>
        <span class="input-group-btn">
            <button type="button" onclick="addBasket(${id})" id="basket-add-${id}" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                <span class="fa-solid fa-plus"></span>
            </button>
        </span>
    </div>
</div>
`;
};
let basket;
const get_quantity = (id) => {
  if (basket) {
    return basket[id].quantity;
  }
  return 0;
};
let allprods;
function get() {
  $.getJSON(prodAPI, function (results) {
    console.log(results);
    $.each(results, function (index) {
        const id = results[index].id;
        let quantity = get_quantity(results[index].id);
        console.log(`quantity: ${quantity}`);
        let prod = prodhtml(
            results[index].img,
            results[index].prod_name,
            id,
            quantity,
            String(quantity).length
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
function addBasket(id) {
  $.ajax({
    url: basketAPI + id,
    type: "POST",
    success: function (data) {
      $("#basket-counter-" + id)
        .val(String(data[id].quantity))
        .attr("size", String(data[id].quantity).length);
    },
  });
}

function subBasket(id) {
  $.ajax({
    url: basketAPI + id,
    type: "POST",
    data: { subtract: "True" },
    success: function (data) {
      $("#basket-counter-" + id)
        .val(String(data[id].quantity))
        .attr("size", String(data[id].quantity).length);
    },
  });
}

function setBasket(id) {
  $.ajax({
    url: basketAPI + id,
    type: "POST",
    data: { quantity: $("#basket-counter-" + id).val() },
    success: function (data) {
      $("#basket-counter-" + id)
        .val(String(data[id].quantity))
        .attr("size", String(data[id].quantity).length);
    },
  });
}

function main() {
  get()
}
main();
