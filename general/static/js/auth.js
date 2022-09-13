const email = document.getElementById("userInfoEmail").value;
const full_name = document.getElementById("userInfoName").value;
const address = document.getElementById("userInfoAddress").value;
const city = document.getElementById("userInfoCity").value;
const postcode = document.getElementById("userInfoPostcode").value;
const country = document.getElementById("userInfoCountry").value;
const createuserform = `
<div id="createuser-form" class="col-12">
    <div class="row">
        <div class="col-12">
            <label for="createuser-username" class="form-label">Username</label>
            <input type="text" class="form-control" id="createuser-username" placeholder="exampleusername">
        </div>
        <div class="col-md-6 col-sm-12">
            <label for="createuser-password" class="form-label">Password</label>
            <input type="password" class="form-control" id="createuser-password" placeholder="********">
        </div>
        <div class="col-md-6 col-sm-12">
            <label for="createuser-password2" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="createuser-password2" placeholder="********">
        </div>
    </div>
</div>
`;

const passwordNomatch = `
<div class="alert alert-danger" role="alert">
    <strong>Oh no!</strong> Passwords do not match!
</div>
`;

let userData;

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

function create_user() {
  const username = document.getElementById("createuser-username").value;
  const password = document.getElementById("createuser-password").value;
  const password2 = document.getElementById("createuser-password2").value;
  const data = {
    username: username,
    password: password,
    password2: password2,
    email: email,
    profile: {
      full_name: full_name,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
    },
  };
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:800/api/users/",
    data: JSON.stringify(data),
    headers: { "X-CSRFToken": csrftoken },
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      if (data.nomatch == "true") {
        $("#user-error-message").html(passwordNomatch);
      }
    },
    error: function (data) {
      alert("Error creating user");
    },
  });
}

$("#createAccountSwitch").on("change", function () {
  if (this.checked) {
    $("#userInfo").append(createuserform);
  } else {
    $("#createuser-form").remove();
  }
});

function getUserData() {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:800/api/users/",
    dataType: "json",
    success: function (data) {
      userData = data;
      if (data.authenticated == "true") {
        $(email).attr("value", data.email).prop("disabled", true);
        $(full_name).attr("value", data.profile.full_name).prop("disabled", true);
        $(address).attr("value", data.profile.address).prop("disabled", true);
        $(city).attr("value", data.profile.city).prop("disabled", true);
        $(postcode).attr("value", data.profile.postcode).prop("disabled", true);
        $(country).attr("value", data.profile.country).prop("disabled", true);
        $('#createAccountSwitch').prop('disabled', true);
      }
    },
  });
}
