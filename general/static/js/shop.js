
const prodhtml = (img, name, id, q, s, p) => {
  return `
<div class="product col-lg-3 col-md-4 col-sm-6 rounded bg-light wi-fc mx-3 text-center">
    <div class="description mx-auto" style="width:100px;">
        <img class="d-block mx-auto rounded-circle" src="${img}" alt="product image" width="100">
    </div>
    <div class="text-center">
        <p class="d-inline giBold">${name}</p>
        <p class="d-inline text-muted">€${p}</p>
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

let allprods;
function get() {
  if (productData == null || basketData == null) {
    setTimeout(get, 100);
    return;
  }
  $.each(productData, function (index) {
    const id = productData[index].id;
    let quantity = get_quantity(id);
    console.log(`quantity: ${quantity}`);
    let prod = prodhtml(
      productData[index].img,
      productData[index].prod_name,
      id,
      quantity,
      String(quantity).length,
      productData[index].price
    );
    if (allprods == null) {
      allprods = prod;
    } else {
      allprods += prod;
    }
    $("#products").html(allprods);
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
