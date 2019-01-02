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
    <link rel="stylesheet" href="../css/user.css" />
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/uikit.min.css" />
</head>

<body>
    <?php include_once("../include/navbar.php"); ?>
    <section class="uk-section uk-section-default">
        <div class="uk-card uk-card-default uk-card-body uk-flex-center">
            <img src="../img/icon.png" alt="">
            <h3 class="uk-card-title">LANDMARK UNIVERSITY </h3>
            <h3 class="uk-card-title">SDC / SJC OFFENCE INFORMATION</h3>
            <span id="img"></span>
            <div class="uk-card uk-card-default uk-card-body offence__card">
                <span>
                    <span uk-icon="icon: bolt"></span> OFFENCE COMMITED: &nbsp; &nbsp;
                    <span id="offense">FIGHTING</span>
                </span>
            </div>
            <h4 class="uk-card-title">Bio Data</h4>
            <!-- start of grid system -->
            <div class="student uk-grid-divider uk-child-width-expand@s" uk-grid>
                <!-- FIRST COLUMN FOR THE PROFILE DETAILS -->

                <div class="">
                    <!-- column 1 content -->


                    <!-- End of this card -->
                </div>
                <!-- End of column 2 -->
            </div>
            <!-- END OF CARD GRID SYSTEM -->

            <!-- COMPLIANT SQUAD REPORT -->
            <h3 class="uk-card-title">COMMANDER/COMMANDANT REPORT</h3>
            <p id="report">
                NO REPORT ON THIS CASE
            </p>
            <!-- COMPLIANT REPORT -->

            <button class="uk-button lmu__btn__success" onclick="window.print();return false;">
                <span uk-icon="icon: print"></span> Print For SDC
            </button>
        </div>
    </section>
    <script src="../js/jquery.min.js">
    </script>
    <script src="../js/axios.min.js">
    </script>
    <?php require("../include/check.php"); ?>
    <script src="../js/uikit.min.js">
    </script>
    <script src="../js/uikit-icons.min.js">
    </script>
    <script src="../js/sdc.js">
    </script>
</body>

</html>