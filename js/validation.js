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
    if (password.length > 7) {
      if (username.length > 3) {
        $("input").attr("disabled", true);
        $("#btn_login")
          .attr("disabled", true)
          .html("Loading...");
        $.ajax({
          method: "POST",
          url: "http://localhost:8080/revo/server/public/login",
          data: { username: username, password: password },
          cache: false,
          success: response => {
            var data = JSON.parse(response);
            if (data.error) {
              UIkit.notification({
                message: data.error.err_text,
                status: "danger",
                pos: "top-center",
                timeout: 5000
              });
              $("input").attr("disabled", false);
              $("#btn_login")
                .attr("disabled", false)
                .html(
                  `<button 
                  class="uk-button uk-button-danger rounded" 
                  uk-icon="icon: check" 
                  id="btn_login">
                    Login 
                  </button>`
                );
            } else {
              $("input").attr("disabled", false);
              $("#btn_login")
                .attr("disabled", false)
                .html(
                  `<button 
                  class="uk-button uk-button-danger rounded" 
                  uk-icon="icon: check" 
                  id="btn_login">
                    Login 
                  </button>`
                );
              var time = new Date(data.time).getTime();
              var expires = new Date().getTime() + time * 1000;
              var token = data.token;
              localStorage.setItem("token", token);
              localStorage.setItem("expires", expires);
              window.location.href = "booking.php";
            }
          },
          error: err => {
            UIkit.notification({
              message: "Sorry we couldn't connect to server",
              status: "danger",
              pos: "top-center",
              timeout: 5000
            });
            $("input").attr("disabled", false);
            $("#btn_login")
              .attr("disabled", false)
              .html(
                `<button 
                  class="uk-button uk-button-danger rounded" 
                  uk-icon="icon: check" 
                  id="btn_login">
                    Login 
                  </button>`
              );
          }
        });
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
        message: "  Password length must be more than 7 characters!",
        status: "danger",
        pos: "top-center",
        timeout: 5000
      });
    }
  }
});
