document.addEventListener("DOMContentLoaded", function (event) {
  var user = window.localStorage.getItem("user");
  console.log("user", user);
  if (user == null) {
    window.location.href = "/Frontend/Login.html";
  }
});

function logout() {
  window.localStorage.removeItem("user");
  window.location.href = "/Frontend/Login.html";
}
