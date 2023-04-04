function onPageLoad() {
  console.log("Image Loaded");

  fetch(`http://localhost:3000/cars`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Not Loaded");
      }
    })
    .then((data) => {
      var parent = document.getElementById("root");
      var child = document.createElement("div");
      child.textContent = JSON.stringify(data);
      parent.appendChild(child);
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}
