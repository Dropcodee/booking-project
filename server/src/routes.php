<?php
// Create and configure Slim app
$app = new \Slim\App;

/*************************************************************
 ******************** Get All Users **************************
 *************************************************************/
$app->get('/users', function ($request, $response, $args) {
    // SQL Query to the database
    $sql = "SELECT * FROM users";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $users = $db->getQuery($sql);

    if ($users > 0) {
        // Encode in JSON
        return json_encode($users);
    } else {
        return '{"error": {"err_text": "Oops revo members not found!!!"}}';
    }

});

/*************************************************************
 ******************** Get a single revo member ***************
 *************************************************************/
$app->get('/users/{username}', function ($request, $response, $args) {
    $username = $args['username'];
    // SQL Query to the database
    $sql = "SELECT * FROM users WHERE username = :username";

    // Assign the Parameters
    $db_params = [
        'username' => $username,
    ];

    // Get the Db Object
    $db = new Db();

    // Connect and Send Query
    $user = $db->getQuery($sql, $db_params);

    if ($user > 0) {
        // Get the Query in JSON Formate
        return json_encode($user);
    } else {
        return '{"error":{"err_text":"No username as ' . $username . ' in the database"}}';
    }
});

// Add a Revo Member
$app->post("/add", function ($req, $res, $args) {
    $username = $req->getParam("username");
    $password = $req->getParam("password");
    $position = $req->getParam("position");
    $sql = "SELECT username FROM users WHERE username = :username";
    $db_param = ["username" => $username];
    $db = new Db();
    $db = $db->getQuery($sql, $db_param);
    if ($db > 0) {
        $db = new Db();
        $username = $db->generate_username($username, 50);
        $cstrong = true;
        $user_id = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
        $sql = "INSERT INTO users (user_id, username, password, position) VALUES (:user_id, :username, :password, :position)";
        $db_params = array("user_id" => $user_id, "username" => $username, "password" => password_hash($password, PASSWORD_BCRYPT, [12]), "position" => $position);
        $db = new Db();
        $db = $db->postQuery($sql, $db_params, $msg = "" . $username . " has been add");
    } else {
        $cstrong = true;
        $user_id = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
        $sql = "INSERT INTO users (user_id, username, password, position) VALUES (:user_id, :username, :password, :position)";
        $db_params = array("user_id" => $user_id, "username" => $username, "password" => password_hash($password, PASSWORD_BCRYPT, [12]), "position" => $position);
        $db = new Db();
        $db = $db->postQuery($sql, $db_params, $msg = "New revo member add");
    }
});

/*************************************************************
 ******************** Login a Revo Member ********************
 *************************************************************/
$app->post('/login', function ($request, $response, $args) {
    $username = $request->getParam('username');
    $password = $request->getParam('password');
    $db = new Db();
    $db = $db->connect();
    $statement = $db->prepare("SELECT user_id, password FROM users WHERE username = :username");
    $statement->execute(['username' => $username]);
    $user = $statement->fetch(PDO::FETCH_OBJ);
    $count = $statement->rowCount();

    if ($count > 0) {
        $db_password = $user->password;
        if (password_verify($password, $db_password)) {
            session_start();
            $_SESSION['user_id'] = $user->user_id;
            $_SESSION['date'] = date("Y-m-d H:i:s");
            $id = $user->user_id;
            $loggedin = 1;
            $db = new Db();
            $sql_insert = "INSERT INTO loggedin (user_id, loggedin, time) VALUES (:user_id, :loggedin, :time)";
            $db_params_insert = ["user_id" => $id, 'loggedin' => $loggedin, 'time' => $_SESSION['date']];
            $db_insert = $db->postQuery($sql_insert, $db_params_insert);
            $sql = "SELECT username, position, user_id FROM users WHERE user_id = :user_id";

            // Assign the Parameters
            $db_params = [
                'user_id' => $id,
            ];

            // Connect and Send Query
            $user = $db->getQuery($sql, $db_params);

            // Get the Query in JSON Formate
            return json_encode($user);
        } else {
            return '{"error": {"err_text": "Incorrect username or password"}}';
        }
    } else {
        return '{"error": {"err_text": "Incorrect username"}}';
    }
});

/*************************************************************
 ******************** Logout a Revo Member *******************
 *************************************************************/
$app->post("/logout", function ($request, $response, $args) {
    session_start();
    $user_id = $_SESSION['user_id'];
    $sql = "DELETE FROM loggedin WHERE user_id = :user_id";
    $db_param = ['user_id' => $user_id];
    $db = new Db();
    $db = $db->postQuery($sql, $db_param);
    session_destroy();
});

/*************************************************************
 ******************** Get all Students ***********************
 *************************************************************/
$app->get("/students", function () {
    // SQL Query to the database
    $sql = "SELECT * FROM students ORDER BY id DESC LIMIT 1000";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $students = $db->getQuery($sql);

    if ($students > 0) {
        // Encode in JSON
        return json_encode($students);
    } else {
        return '{"error": {"err_text": "Oops students not found!!!"}}';
    }
});

/*************************************************************
 ******************** Get a specific student *****************
 *************************************************************/
$app->get("/students/{reg_no}", function ($request, $response, $args) {
    $reg_no = $args["reg_no"];
    // SQL Query to the database
    $sql = "SELECT * FROM students WHERE reg_no = :reg_no";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $students = $db->getQuery($sql, ["reg_no" => $reg_no]);

    if ($students > 0) {
        // Encode in JSON
        return json_encode($students);
    } else {
        return '{"error": {"err_text": "Oops student not found!!!"}}';
    }
});

// Search for a student
$app->get("/students/search/{q}", function ($req, $res, $args) {
    $search = $args["q"];
    $name = explode(" ", $search);
    $reg_no = explode(" ", $search);
    $sql = "SELECT * FROM students WHERE students.reg_no LIKE :reg_no OR students.name LIKE :name";
    $search_param = [":name" => '%' . $name[0] . '%', "reg_no" => '%' . $reg_no[0] . '%'];
    $db = new Db();
    $searchResult = $db->getQuery($sql, $search_param);
    if ($searchResult > 0) {
        return json_encode($searchResult);
    } else {
        return '{"error": {"err_text": "Oops ' . $search . ' not found!!!"}}';
    }
});

/*************************************************************
 ******************** Get all offenses ***********************
 *************************************************************/
$app->get("/offense", function () {
    // SQL Query to the database
    $sql = "SELECT * FROM booking ORDER BY id DESC LIMIT 1000";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $offense = $db->getQuery($sql);

    if ($offense > 0) {
        // Encode in JSON
        return json_encode($offense);
    } else {
        return '{"error": {"err_text": "Oops offense not found!!!"}}';
    }
});

/*************************************************************
 ******************** Get student offenses ***********************
 *************************************************************/
$app->get("/offense/{reg_no}", function ($request, $response, $args) {
    $reg_no = $args["reg_no"];
    // SQL Query to the database
    $sql = "SELECT * FROM booking WHERE reg_no = :reg_no ORDER BY created DESC";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $students = $db->getQuery($sql, ["reg_no" => $reg_no]);

    if ($students > 0) {
        // Encode in JSON
        return json_encode($students);
    } else {
        return '{"error": {"err_text": "No offense for this student yet"}}';
    }
});

/*************************************************************
 ******************** Book a Student *************************
 *************************************************************/
$app->post("/book", function ($req, $res, $args) {
    $reg_no = $req->getParam("reg_no");
    $offense = $req->getParam("offense");
    $category = $req->getParam("category");
    $status = "Pending";
    $db = new Db();

    $sql_select = "SELECT name from students WHERE reg_no = :reg_no";
    $db_params_select = ["reg_no" => $reg_no];
    $student = $db->getQuery($sql_select, $db_params_select);
    if ($student > 0) {
        foreach ($student as $student) {
            $name = $student->name;
            $sql_insert = "INSERT INTO booking (reg_no, offense, category, status) VALUES (:reg_no, :offense, :category, :status)";
            $db_params_insert = [
                "reg_no" => $reg_no,
                "offense" => $offense,
                "category" => $category,
                "status" => $status,
            ];
            $book = $db->postQuery($sql_insert, $db_params_insert, $msg = '' . $name . ' has been booked successfully');
        }
    } else {
        return '{"error": {"err_text": "User not found"}}';
    }
});

// Add Punishment to a given student
$app->post("/punishment", function ($req, $res, $args) {
    $reg_no = $req->getParam("reg_no");
    $punishment = $req->getParam("punishment");
    $status = "Processed";
    $updated = date("Y-m-d H:i:s");
    $db = new Db();
    $sql = "SELECT name FROM students WHERE reg_no = :reg_no";
    $db_params = ["reg_no" => $reg_no];
    $student = $db->getQuery($sql, $db_params);
    if ($student > 0) {
        foreach ($student as $student) {
            $name = $student->name;
            $sql_select = "SELECT reg_no FROM booking WHERE reg_no = :reg_no";
            $db_params_select = ["reg_no" => $reg_no];
            $check_offense = $db->getQuery($sql_select, $db_params_select);
            if ($check_offense > 0) {
                $sql_insert = "INSERT INTO punishment (reg_no, punishment) VALUES (:reg_no, :punishment)";
                $db_insert = ["reg_no" => $reg_no, "punishment" => $punishment];
                $insert = $db->postQuery($sql_insert, $db_insert);
                $sql_update = "UPDATE booking SET reg_no = :reg_no, punishment = :punishment, status = :status, updated = :updated WHERE id = 1";
                $db_params_update = ["reg_no" => $reg_no, "punishment" => $punishment, "status" => $status, "updated" => $updated];
                $update = $db->postQuery($sql_update, $db_params_update, $msg = "" . $name . " has been asigned a punishment successfully");
            } else {
                return '{"error": {"err_text": "You cannot give ' . $name . ' punishment when not yet booked"}}';
            }
        }
    } else {
        return '{"error": {"err_text": "Student with this registration number ' . $reg_no . ' doesn\'t exist"}}';
    }

});