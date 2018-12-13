<?php
  require("../include/auth.php");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Dashboard - Revolutionary Squad</title>
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/uikit.min.css" />
    <link rel="stylesheet" href="../css/tabulator.min.css" />
    <script src="../js/jquery.min.js"></script>
    <script src="../js/axios.min.js"></script>
    <script>
      var expiresIn = localStorage.getItem("expires"),
        token = localStorage.getItem("token"),
        time = new Date().getTime();
      
      if (time > expiresIn) {
        window.location.href = "index.php";
        localStorage.removeItem("expires");
      } else if(token) {
        axios
        .get(`http://localhost:8080/revo/server/public/loggedin/${token}`)
        .then(result => {
          if (result.data == false) {
            window.location.href = "index.php";
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
          } else {
            result.data.forEach(data => {
              axios.get(`http://localhost:8080/revo/server/public/users/${data.user_id}`).then((result) => {
                result.data.forEach(data => {
                  var position = data.position;
                  console.log(position);
                  if(position != "Admin") {
                    window.location.href = "booking.php";
                  }
                })
              }).catch((err) => {
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
      }
      else if (!expiresIn || !token) {
        window.location.href = "index.php";
      }
    </script>
  </head>
  <body>
    <!-- NAVIGATION BAR FOR ADMIN PAGE -->
    <nav class="uk-navbar-container uk-margin" uk-navbar>
      <div class="uk-navbar-left">
        <div>
          <ul class="uk-navbar-nav">
            <li><a href="dashboard.php">ADMIN</a></li>
          </ul>
        </div>
      </div>
      <div class="uk-navbar-center">
        <a class="uk-navbar-item uk-logo" href="#">Logo</a>
      </div>
      <div class="uk-navbar-right">
        <div>
          <ul class="uk-navbar-nav">
            <li>
              <a href="#">
                <button class="uk-button uk-button-default">Logout</button></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- NAVIGATION BAR FOR ADMIN PAGE -->

    <!-- TABLE OF ALL MEMBERS -->
    <div class="users__section uk-container">
      <div class="header__section">
        <h3 class="uk-heading-line uk-text-center admin__header">
          <span>REVOLUTIONARY SQUAD MEMBERS</span>
        </h3>
        <hr id="custom__divider" />
      </div>
      <div
        class=" uk-child-width-expand@s uk-text-center uk-flex-cente"
        uk-grid
      >
        <div class="uk-overflow-auto">
          <table class="uk-table uk-table-hover uk-table-divider">
            <thead>
              <tr>
                <th>S/N</th>
                <th>IMAGE</th>
                <th>FULL NAME</th>
                <th>USERNAME</th>
                <th>POSITION</th>
                <th>WEBMAIL</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody id="display__users">
              
            </tbody>
          </table>
          <div id="example-table"></div>
        </div>
      </div>
    </div>

    <!-- TABLE OF ALL MEMBERS -->
    <span id="show__modal"></span>

    <!-- ADD NEW MEMBER SECTION -->
    <div class="new__section">
      <div class="header__section uk-container">
        <h3 class="uk-heading-line uk-text-center admin__header">
          <span>Add New Members </span>
        </h3>
        <hr id="custom__divider" />
      </div>

      <div
        class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade"
        uk-height-viewport
      >
        <div class="uk-width-1-1">
          <div class="uk-container">
            <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
              <div class="uk-width-1-1@m">
                <div
                  class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-large uk-card-body uk-box-shadow-large uk-flex-center"
                >
                  <img
                    class="uk-card-title card__avatar"
                    src="../img/avatar.png"
                    alt="new member"
                  />
                  <form method="POST" autocomplete="off">
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: user"
                        ></span>
                        <input
                          class="uk-input uk-form-large"
                          type="text"
                          id="name"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: user"
                        ></span>
                        <input
                          class="uk-input uk-form-large"
                          type="text"
                          id="username"
                          placeholder="User Name"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <select name="position" id="position" class="uk-select uk-form-large">
                          <option value="">Select Position</option>
                          <option value="Member">Member</option>
                          <option value="Commander">Commander</option>
                          <option value="Commandant">Commandant</option>
                          <option value="Secetary">Secetary</option>
                        </select>
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: mail"
                        ></span>
                        <input
                          class="uk-input uk-form-large"
                          type="text"
                          id="webmail"
                          placeholder="amaizing.blessing@lmu.edu.ng"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input uk-form-large"
                          type="password"
                          id="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <div class="uk-inline uk-width-1-1">
                        <span
                          class="uk-form-icon uk-form-icon-flip"
                          uk-icon="icon: lock"
                        ></span>
                        <input
                          class="uk-input uk-form-large"
                          type="password"
                          id="confirmPassword"
                          placeholder="Re-Enter Password"
                        />
                      </div>
                    </div>
                    <div class="uk-margin">
                      <button
                        class="uk-button uk-button uk-button-large uk-width-1-1 lmu__btn__success uk-form-icon-flip"
                        uk-icon="icon: check"
                        id="addUser"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ADD NEW MEMBER SECTION -->

    <!-- footer section -->
    <div
      class="uk-card uk-card-default uk-card-body lmu__footer"
      style="z-index: 980;"
      uk-sticky="offset: 100; bottom: #top"
    >
      <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
        <div class="lmu__links">
          <h4 class="uk-heading-line uk-text-center">
            <span>Quick Links.</span>
          </h4>
          <div class="lmu__links__wrapper">
            <ul>
              <li>
                <a href="https://lmu.edu.ng" target="_blank"
                  >Landmark University</a
                >
              </li>
              <li>
                <a href="https://webmail2.lmu.edu.ng" target="_blank"
                  >Webmail</a
                >
              </li>
              <li>
                <a href="https://internet.lmu.edu.ng" target="_blank"
                  >Internet Login</a
                >
              </li>
              <li>
                <a href="www.hiddenhyve.com" target="_blank">HiddenHyve</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 class="uk-heading-line uk-text-center">
            <span>Our Mission</span>
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            voluptate veritatis atque sapiente amet architecto iusto provident
            cupiditate! Dolore doloremque eius ut! Suscipit voluptate, eum quia
            amet aliquid recusandae eaque?
          </p>
        </div>
        <div>
          <p>© 2018 Revolutionary Squad</p>
          <p>
            Powered By -
            <a href="https://www.hiddenhyve.org" target="_blank">Hidden Hyve</a>
          </p>
        </div>
      </div>
    </div>
    <!-- footer section -->
    <script src="../js/jquery.min.js"></script>
    <script src="../js/uikit.min.js"></script>
    <script src="../js/uikit-icons.min.js"></script>
    <script src="../js/axios.min.js"></script>
    <script src="../js/tabulator.min.js"></script>
    <script src="../js/users.js"></script>
  </body>
</html>
