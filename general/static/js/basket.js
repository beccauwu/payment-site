const url = "http://127.0.0.1:8000/api/basket/";
function get() {
  $.getJSON(url, function (results) {
    console.log(results);
    let items = [];
    $.each(results, function (index) {
      items.push(
        '<li id="' + results[index].id + '">' + results[index].name + "</li>"
      );
    });
    $("<ul/>", {
      class: "my-new-list",
      html: items.join(""),
    }).appendTo("#test");
  });
}
function deleteCart(){
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
        }
    });
}

