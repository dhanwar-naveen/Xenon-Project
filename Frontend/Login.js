function checkUserLogin() {
  const userName = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;

  fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userName, password: userPassword }),
  })
    .then((res) => {
      if (res.status == 200) {
        console.log("yey");
        window.localStorage.setItem("user", userName);
        window.location.href = "/Frontend/Home.html";
      } else {
        alert("unauthorized");
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}
