let loginBtn = document.getElementById("btn_login");

loginBtn.addEventListener("click", event => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username === "" || password === "") {
    UIkit.notification({
      message: "All Fields Required!",
      status: "danger",
      pos: "top-center",
      timeout: 5000
    });
  } else {
    if (password.length > 8) {
      if (username.length > 4) {
        UIkit.notification({
          message: "Your Request is Sending...",
          status: "success",
          pos: "top-center",
          timeout: 5000
        });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            UIkit.notification({
              message: "Login Succesful",
              status: "success",
              pos: "top-center",
              timeout: 5000
            });
            window.location.href = "booking.html";
          }
        };
        xhttp.open("GET", "http://localhost/Revo/js/users.json", true);
        xhttp.send();
      } else {
        UIkit.notification({
          message: "Username is too short or incorrect",
          status: "danger",
          pos: "top-center",
          timeout: 5000
        });
      }
    } else {
      UIkit.notification({
        message: "  Password length must be more than 4 characters!",
        status: "danger",
        pos: "top-center",
        timeout: 5000
      });
    }
  }
});
