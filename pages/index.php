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

<body id="bodyImg">
    <!-- NAVIGATION FOR HOME PAGE -->
    <nav class="uk-navbar-container nav__custom" uk-navbar>
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li class="uk-active">
                    <a href="index.html" class="uk-link">LOGO</a>
                </li>
            </ul>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li class="uk-active"><a href="#about">About Us</a></li>
                <li>
                    <a href="#">
                        <button class="uk-button uk-button-default btn__nav" uk-toggle="target: #loginForm">
                            Login
                        </button>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- HERO HEADER SVG -->
    <div class="hero__wrapper">
        <div class="hero__overlay">
            <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                <div class="container">
                    <div class="typed__wrapper"><span id="typed"></span></div>
                    <button class="uk-button uk-button-default btn__flat" uk-toggle="target: #loginForm">
                        Start Booking !
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- HERO HEADER SVG -->
    <!-- LOGIN MODAL FORM -->
    <div id="loginForm" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical ">
            <h2 class="uk-modal-title uk-flex-center">Member Login !!!</h2>
            <div class="uk-card uk-card-body uk-flex-center">
                <img class="uk-card-title" src="../img/avatar-gold.png" />
                <form>
                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input class="uk-input error__input" type="text" id="username" placeholder="Enter Username" />
                        </div>
                    </div>

                    <div class="uk-margin">
                        <div class="uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input class="uk-input" type="password" id="password" placeholder="Enter Password" />
                        </div>
                    </div>
                    <button class="uk-button rounded lmu__btn__gold" uk-icon="icon: check" id="btn_login">
                        Login
                    </button>
                </form>
            </div>
            <button class="uk-modal-close-default" type="button" uk-close></button>
        </div>
        <span id="demo"></span>
    </div>
    <!-- LOGIN MODAL FORM -->
    <div class="login__system">
        <div class="container"></div>
    </div>
    <script src="../js/jquery.min.js">
    </script>
    <script src="../js/uikit.min.js">
    </script>
    <script src="../js/uikit-icons.min.js">
    </script>
    <script src="../js/typed.js">
    </script>
    <script src="../js/validation.js">
    </script>
    <script src="../js/effects.js">
    </script>
</body>

</html>