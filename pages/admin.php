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
</head>

<body>
    <!-- NAVIGATION BAR FOR ADMIN PAGE -->
    <?php  include_once('../include/navbar.php') ?>
    <!-- NAVIGATION BAR FOR ADMIN PAGE -->

    <!-- CATEGORY SECTION -->
    <section class="category__section uk-container uk-flex-center">
        <div class="uk-card uk-card-default uk-card-body uk-card-hover">
            <h3 class="uk-card-title">Offence Categories</h3>
            <p>Select a category to view offenders under a specific category</p>
            <hr class="uk-divider-icon" />
            <ul class="uk-flex-center uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
                <li class="uk-active"><a href="a" id="a">CATEGORY A</a></li>
                <li><a href="b" id="b">CATEGORY B</a></li>
                <li><a href="c" id="c">CATEGORY C</a></li>
                <li><a href="d" id="d">CATEGORY D</a></li>
            </ul>

            <ul class="uk-switcher uk-margin">
                <li>
                    <div class="uk-overflow-auto">
                        <table class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>IMAGE</th>
                                    <th>FULL NAME</th>
                                    <th>REG NO</th>
                                    <th>MATRIC NO</th>
                                    <th>OFFENCE</th>
                                </tr>
                            </thead>
                            <tbody id="show__a"></tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div class="uk-overflow-auto">
                        <table class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>IMAGE</th>
                                    <th>FULL NAME</th>
                                    <th>REG NO</th>
                                    <th>MATRIC NO</th>
                                    <th>OFFENCE</th>
                                </tr>
                            </thead>
                            <tbody id="show__b">
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div class="uk-overflow-auto">
                        <table class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>IMAGE</th>
                                    <th>FULL NAME</th>
                                    <th>REG NO</th>
                                    <th>MATRIC NO</th>
                                    <th>OFFENCE</th>
                                </tr>
                            </thead>
                            <tbody id="show__c">
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div class="uk-overflow-auto">
                        <table class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>IMAGE</th>
                                    <th>FULL NAME</th>
                                    <th>REG NO</th>
                                    <th>MATRIC NO</th>
                                    <th>OFFENCE</th>
                                </tr>
                            </thead>
                            <tbody id="show__d">
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    <!-- CATEGORY SECTION -->
    <script src="../js/jquery.min.js">
    </script>
    <script src="../js/axios.min.js">
    </script>
    <?php require("../include/check.php"); ?>
    <script src="../js/admin.js">
    </script>
    <script src="../js/uikit.min.js">
    </script>
    <script src="../js/uikit-icons.min.js">
    </script>
</body>

</html>