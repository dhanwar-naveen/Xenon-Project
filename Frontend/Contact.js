function postContact() {
  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userMessage = document.getElementById("message").value;

  //   console.log(userName);
  //   console.log(userEmail);
  //   console.log(userMessage);

  fetch(`http://localhost:3000/contact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      email: userEmail,
      message: userMessage,
    }),
  })
    .then((res) => {
      if (res.status == 200) {
        alert("Message sent.");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        //window.location.href = "/Frontend/Home.html";
      } else {
        alert("Something went Wrong");
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}
