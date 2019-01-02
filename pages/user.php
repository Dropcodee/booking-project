<?php
  require("../include/auth.php");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Student - Offense</title>
    <link rel="stylesheet" href="../css/user.css" />
    <link rel="stylesheet" href="../css/uikit.min.css" />
    <link rel="stylesheet" href="../css/style.css" />
  </head>
  <body>
    <section class="">
      <div class="card">
        <div class="top-section">
          <a href="admin.php" id="back__arrow"
            ><img src="../img/arrow.png" alt="Go Back"
          /></a>
          <div class="facebook"><a class="fa fa-facebook" href="#"></a></div>
        </div>
        <div class="avatar" id="avatar"><img src="../img/profile.png" /></div>
        <div class="bottom-section">
          <div
            class="uk-card uk-card-default uk-card-body card__profile uk-card-hover"
          >
            <h3 class="uk-card-title">Bio Data:</h3>
            <!-- start of grid system -->
            <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
              <!-- FIRST COLUMN FOR THE PROFILE DETAILS -->

              <div id="card__details1">
                <!-- column 1 content -->

                
                <!-- End of this card -->
              </div>
              <!-- End of first column -->

              <!-- SECOND COLUMN FOR THE PROFILE DETAILS -->

              <div id="card__details2">
                <!-- column 2 content -->

                
              </div>
              <!-- End of column 2 -->
            </div>
            <!-- END OF CARD GRID SYSTEM -->
            <hr class="uk-divider-icon" />
            <!-- start of processed offences -->

            <div>
              <h3 class="uk-card-title">Processed Offences</h3>
              <div
                class="processed uk-grid-small uk-child-width-expand@s uk-text-center"
                uk-grid
              >
            </div>
            <!-- end of processed offences -->
            <hr class="uk-divider-icon" />
            <!-- start of processed offences -->

            <div>
              <h3 class="uk-card-title">Pending Offences</h3>
              <div
                class="pending uk-grid-small uk-child-width-expand@s uk-text-center"
                uk-grid
                id="cancel__offence"
              >
              
              </div>

              <div>
                <a href="admin.php"
                  ><button class="uk-button uk-align-right card__btn">
                    <span uk-icon="icon: arrow-left"></span>Back
                  </button></a
                >
              </div>
            </div>
            <!-- end of processed offences -->
          </div>
        </div>
      </div>
    </section>

    
    <script src="../js/jquery.min.js"></script>
    <script src="../js/axios.min.js"></script>
    <?php require("../include/check.php"); ?>
    <script src="../js/uikit.min.js"></script>
    <script src="../js/uikit-icons.min.js"></script>
    <script src="../js/students.js"></script>
  </body>
</html>
