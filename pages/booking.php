<?php
  require("../include/auth.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Revolutionary Squad</title>
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/uikit.min.css" />
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
    <?php  include_once('../include/navbar.php') ?>
    <section id="search__section">
        <div class="searchbar__wrapper">
            <div class="uk-card uk-card-hover uk-card-default uk-card-body card__search ">
                <h3 class="uk-card-title uk-flex-center">Search Students</h3>
                <div class="uk-flex-center">
                    <div class="uk-search uk-search-large">
                        <span class="uk-search-icon-flip " uk-search-icon></span>
                        <input class="uk-search-input" type="search" placeholder="Search..." id="search" maxlength="7" />
                    </div>
                </div>
            </div>
        </div>
        <!-- STUDENTS INFORMATION -->
        <span id="loading">
            <center>
                <div uk-spinner="ratio: 3"></div>
            </center>
        </span>
        <div class="uk-child-width-1-2@s uk-child-width-1-4@l uk-grid-match uk-text-center uk-grid-small student__info"
            uk-grid id="student__info">
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                    <h3 class="uk-card-title">
                        <img src="../img/avatar.png" alt="" />
                    </h3>
                    <p>
                        <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                        <span>John Doe</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Matric
                        No: <span>15AC009899</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Reg No:
                        <span>1500324</span>
                    </p>
                    <button class="uk-button uk-button-success rounded" uk-toggle="target: #book__now">
                        Book Student
                    </button>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                    <h3 class="uk-card-title">
                        <img src="../img/avatar.png" alt="" />
                    </h3>
                    <p class="card__text">
                        <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                        <span>John Doe</span>
                    </p>
                    <p class="card__text">
                        <span uk-icon="icon: database" id="details__text"></span> Matric
                        No: <span>15AC009899</span>
                    </p>
                    <p class="card__text">
                        <span uk-icon="icon: database" id="details__text"></span> Reg No:
                        <span>1500324</span>
                    </p>
                    <button class="uk-button uk-button-success rounded" uk-toggle="target: #book__now">
                        Book Student
                    </button>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                    <h3 class="uk-card-title">
                        <img src="../img/avatar.png" alt="" />
                    </h3>
                    <p>
                        <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                        <span> John Doe</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Matric
                        No: <span> 15AC009899</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Reg No:
                        <span> 1500324</span>
                    </p>
                    <button class="uk-button uk-button-success rounded" uk-toggle="target: #book__now">
                        Book Student
                    </button>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-card-hover uk-card-body card__user">
                    <h3 class="uk-card-title">
                        <img src="../img/avatar.png" alt="" />
                    </h3>
                    <p>
                        <span uk-icon="icon: user" id="details__text"></span> USERNAME:
                        <span> John Doe</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Matric
                        No: <span> 15AC009899</span>
                    </p>
                    <p>
                        <span uk-icon="icon: database" id="details__text"></span> Reg No:
                        <span> 1500324</span>
                    </p>

                    <button class="uk-button uk-button-success rounded" uk-toggle="target: #book__now">
                        Book Student
                    </button>
                </div>
            </div>
        </div>
        <!-- STUDENTS INFORMATION -->

        <!-- STUDENT BOOKING MODAL PAGE -->
        <div id="book__now" class="uk-modal-full" uk-modal></div>
        <!-- STUDENT BOOKING MODAL PAGE -->
    </section>
    <script src="../js/jquery.min.js">
    </script>
    <script src="../js/uikit.min.js">
    </script>
    <script src="../js/uikit-icons.min.js">
    </script>
    <script src="../js/booking.js">
    </script>
</body>

</html>