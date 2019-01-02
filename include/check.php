<script>
      var expiresIn = localStorage.getItem("expires"),
        token = localStorage.getItem("token"),
        time = new Date().getTime();
      axios
        .get(`http://localhost:8080/revo/server/public/loggedin/${token}`)
        .then(result => {
          if (result.data == false) {
            window.location.href = "index.php";
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
          } else {
            result.data.forEach(data => {
              axios
                .get(
                  `http://localhost:8080/revo/server/public/users/${
                    data.user_id
                  }`
                )
                .then(result => {
                  result.data.forEach(data => {
                    var position = data.position;
                    if (
                      position != "Commander" &&
                      "Commandant" &&
                      "Dean" &&
                      "AO" &&
                      "Secretary"
                    ) {
                      window.location.href = "booking.php";
                    }
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            });
          }
        })
        .catch(err => {
          window.location.href = "index.php";
          localStorage.removeItem("token");
          localStorage.removeItem("expires");
        });
      if (time > expiresIn) {
        window.location.href = "index.php";
        localStorage.removeItem("expires");
      } else if (token) {
        axios
          .get(`http://localhost:8080/revo/server/public/loggedin/${token}`)
          .then(result => {
            if (result.data == false) {
              window.location.href = "index.php";
              localStorage.removeItem("token");
              localStorage.removeItem("expires");
            } else {
              result.data.forEach(data => {
                axios
                  .get(
                    `http://localhost:8080/revo/server/public/users/${
                      data.user_id
                    }`
                  )
                  .then(result => {
                    result.data.forEach(data => {
                      var position = data.position;
                      console.log(position);
                      if (
                        position != "Commander" &&
                        "Commandant" &&
                        "Dean" &&
                        "AO" &&
                        "Secretary"
                      ) {
                        window.location.href = "booking.php";
                      }
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }
          })
          .catch(err => {
            window.location.href = "index.php";
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
          });
      } else if (!expiresIn || !token) {
        window.location.href = "index.php";
      }
      
      $(document).on("click", "#logout", e=> {
        axios.get("http://localhost:8080/revo/server/public/logout")
      .then((result) => {
        localStorage.clear()
        location.href = "index.php"
      }).catch((err) => {
        localStorage.clear()
        location.href = "index.php"
      });
      })
    </script>