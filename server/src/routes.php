<?php
use Slim\Http\Request;
use Slim\Http\Response;
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

    // Get the Db Object
    $db = new Db();

    // SQL Query to the database
    $sql = "SELECT name, username, position, webmail FROM users WHERE username = :username || user_id = :user_id";

    // Assign the Parameters
    $db_params = [
        'username' => $db->cleanInput($username),
        'user_id' => $db->cleanInput($username)
    ];

    // Connect and Send Query
    $user = $db->getQuery($sql, $db_params);

        // Get the Query in JSON Formate
        return json_encode($user);
});

/*************************************************************
 ******************** Get a loggedin revo member ***************
 *************************************************************/
$app->get('/loggedin/{token}', function ($request, $response, $args) {
    $token = $args['token'];

    // Get the Db Object
    $db = new Db();

    // SQL Query to the database
    $sql = "SELECT user_id FROM loggedin WHERE token = :token";

    // Assign the Parameters
    $db_params = [
        'token' => $db->cleanInput($token)
    ];

    // Connect and Send Query
    $token = $db->getQuery($sql, $db_params);
        
    // Get the Query in JSON Formate
    return json_encode($token);
});

// Add a Revo Member
$app->post("/add", function ($req, $res, $args) {
    $username = $req->getParam("username");
    $password = $req->getParam("password");
    $position = $req->getParam("position");
    $name = $req->getParam("name");
    $webmail = $req->getParam("webmail");
    $db = new Db();
    $sql = "SELECT username FROM users WHERE username = :username";
    $db_param = ["username" => $db->cleanInput($username)];
    $db = $db->getQuery($sql, $db_param);
    if ($db > 0) {
        $db = new Db();
        $username = $db->generate_username($username, 50);
        $cstrong = true;
        $user_id = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
        $sql = "INSERT INTO users (user_id, username, password, position, name, webmail) VALUES (:user_id, :username, :password, :position, :name, :webmail)";
        $db_params = [
            "user_id" => $db->cleanInput($user_id), 
            "username" => $db->cleanUsername($username), 
            "password" => password_hash($password, PASSWORD_BCRYPT, [12]), 
            "position" => $db->cleanInput($position), 
            "name" => $db->cleanInput($name),
            "webmail" => $db->cleanInput($webmail)
        ];
        $db = $db->postQuery($sql, $db_params, $msg = "" . $username . " has been add");
    } else {
        $db = new Db();
        $cstrong = true;
        $user_id = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
        $sql = "INSERT INTO users (user_id, username, password, position, name, webmail) VALUES (:user_id, :username, :password, :position, :name, :webmail)";
        $db_params = [
            "user_id" => $db->cleanInput($user_id), 
            "username" => $db->cleanUsername($username), 
            "password" => password_hash($password, PASSWORD_BCRYPT, [12]), 
            "position" => $db->cleanInput($position), 
            "name" => $db->cleanInput($name),
            "webmail" => $db->cleanInput($webmail)
        ];
        $db = $db->postQuery($sql, $db_params, $msg = "New revo member has been add");
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
            $cstrong = true;
            $token = bin2hex(openssl_random_pseudo_bytes(64, $cstrong));
            $db = new Db();
            $sql = "SELECT user_id, time, token FROM loggedin WHERE user_id = :user_id";
            // Assign the Parameters
            $db_params = [
                'user_id' => $id,
            ];
            // Connect and Send Query
            $user_idQuery = $db->getQuery($sql, $db_params);
            if($user_idQuery > 0) {
                $sql_delete = "DELETE FROM loggedin WHERE user_id = :user_id";
                $db_params_delete = ["user_id" => $id];
                $db_delete = $db->postQuery($sql_delete, $db_params_delete);
                $sql_insert = "INSERT INTO loggedin (user_id, loggedin, time, token) VALUES (:user_id, :loggedin, :time, :token)";
                $db_params_insert = ["user_id" => $id, 'loggedin' => $loggedin, 'time' => $_SESSION['date'], "token" => $token];
                $db_insert = $db->postQuery($sql_insert, $db_params_insert);
                $sql = "SELECT user_id, time, token FROM loggedin WHERE token = :token";
                // Assign the Parameters
                $db_params = [
                    'token' => $token,
                ];
                // Connect and Send Query
                $token = $db->getQuery($sql, $db_params);
                foreach ($token as $token) {
                    $time = $token->time;
                    $token = $token->token;
                    $loggedinArr = ["time" => $time, "token" => $token];

                    // Get the Query in JSON Format
                    return json_encode($loggedinArr);
                }
            } else {
                $sql_insert = "INSERT INTO loggedin (user_id, loggedin, time, token) VALUES (:user_id, :loggedin, :time, :token)";
                $db_params_insert = ["user_id" => $id, 'loggedin' => $loggedin, 'time' => $_SESSION['date'], "token" => $token];
                $db_insert = $db->postQuery($sql_insert, $db_params_insert);
                $sql = "SELECT user_id, time, token FROM loggedin WHERE token = :token";
                // Assign the Parameters
                $db_params = [
                    'token' => $token,
                ];
                // Connect and Send Query
                $token = $db->getQuery($sql, $db_params);
                foreach ($token as $token) {
                    $time = $token->time;
                    $token = $token->token;
                    $loggedinArr = ["time" => $time, "token" => $token];

                    // Get the Query in JSON Format
                    return json_encode($loggedinArr);
                }      
            }    
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
$app->get("/logout", function ($request, $response, $args) {
    session_start();
    $user_id = $_SESSION['user_id'];
    $db = new Db();
    $sql = "DELETE FROM loggedin WHERE user_id = :user_id";
    $db_param = ['user_id' => $db->cleanInput($user_id)];
    $db = $db->postQuery($sql, $db_param);
    session_destroy();
});

/*************************************************************
 ******************** Delete a Revo Member *******************
 *************************************************************/
$app->delete("/delete/{user_id}", function ($request, $response, $args) {
    $user_id = $args["user_id"];

    // Get the Db Object
    $db = new Db();

    $sql_select = "SELECT * FROM users WHERE user_id = :user_id";

    // Assign the Parameters
    $db_params = [
        'user_id' => $db->cleanInput($user_id),
    ];

    // Connect and Send Query
    $user = $db->getQuery($sql_select, $db_params);

    if ($user > 0) {
        $sql = "DELETE FROM users WHERE user_id = :user_id";
        $db_param = ['user_id' => $db->cleanInput($user_id)];
        $db = new Db();
        $db = $db->postQuery($sql, $db_param, "User deleted successfully");
    } else {
        return '{"error":{"err_text":"No such id"}}';
    }
});

// Edit a Revo Member
$app->put("/edit/{user_id}", function(Request $request, Response $response, $args) {
    $user_id = $args["user_id"];
    $username = $request->getParam('username');
    $password = $request->getParam("password");
    $position = $request->getParam("position");
    $sql_select = "SELECT * FROM users WHERE user_id = :user_id";

    // Assign the Parameters
    $db_params = [
        'user_id' => $user_id,
    ];

    // Get the Db Object
    $db = new Db();

    // Connect and Send Query
    $user = $db->getQuery($sql_select, $db_params);

    if ($user > 0) {
        $sql = "UPDATE users SET username = :username, password = :password, position = :position WHERE user_id = :user_id";
        $db_param = [
            'user_id' => $user_id,
            'username' => $db->cleanUsername($username),
            'position' => $db->cleanInput($position),
            'password' => password_hash($password,PASSWORD_BCRYPT, [12])
            ];
        $db = new Db();
        $db = $db->postQuery($sql, $db_param, "User edited successfully");
    } else {
        return '{"error":{"err_text":"No such id"}}';
    }
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
    $students = $db->getQuery($sql, ["reg_no" => $db->cleanInput($reg_no)]);

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
    $db = new Db();
    $sql = "SELECT * FROM students WHERE students.reg_no LIKE :reg_no OR students.name LIKE :name";
    $search_param = [":name" => '%' . $db->cleanInput($name[0]) . '%', "reg_no" => '%' . $db->cleanInput($reg_no[0]) . '%'];
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
    $sql = "SELECT * FROM booking WHERE reg_no = :reg_no || id = :id ORDER BY created DESC";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $students = $db->getQuery($sql, ["reg_no" => $db->cleanInput($reg_no),"id" => $reg_no]);

    if ($students > 0) {
        // Encode in JSON
        return json_encode($students);
    } else {
        return '{"error": {"err_text": "No offense for this student yet"}}';
    }
});

/*************************************************************
 ******************** DELETE student offenses ***********************
 *************************************************************/
$app->delete("/delete_offense/{id}", function ($request, $response, $args) {
    $id = $args["id"];
    // SQL Query to the database
    $sql = "DELETE FROM booking WHERE id = :id";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $getId = $db->getQuery("SELECT id FROM booking WHERE id = :id", ["id" => $id]);
    if($getId > 0) {
        $db->postQuery($sql, ["id" => $db->cleanInput($id)], "Offense deleted");
    }
});

/*************************************************************
 ******************** UPDATE student offenses ***********************
 *************************************************************/
$app->put("/update_offense/{id}", function ($request, $response, $args) {
    $id = $args["id"];
    $report = $request->getParam("snr_report");
    // SQL Query to the database
    $sql = "UPDATE booking SET snr_report = :snr_report, status = 'Processed' WHERE id = :id";
    
    // Get Db Object
    $db = new Db();
    
    // Connect and Send Query
    $getId = $db->getQuery("SELECT id FROM booking WHERE id = :id", ["id" => $id]);
    if($getId > 0) {
    $db->postQuery($sql, ["id" => $db->cleanInput($id), "snr_report" => $report], "Updated");
    }
});

/*************************************************************
 ******************** Get student offenses based on category ***********************
 *************************************************************/
$app->get("/booked/{category}", function ($request, $response, $args) {
    $category = $args["category"];
    // SQL Query to the database
    $sql = "SELECT * FROM booking WHERE category = :category ORDER BY created DESC";

    // Get Db Object
    $db = new Db();

    // Connect and Send Query
    $students = $db->getQuery($sql, ["category" => $db->cleanInput($category)]);

    if ($students > 0) {
        // Encode in JSON
        return json_encode($students);
    } else {
        return '{"error": {"err_text": "No offense fell under the category '.$category.'"}}';
    }
});

/*************************************************************
 ******************** Book a Student *************************
 *************************************************************/
$app->post("/book", function ($req, $res, $args) {
    $reg_no = $req->getParam("reg_no");
    $offense = $req->getParam("offense");
    $category = $req->getParam("category");
    $report = $req->getParam("member_report");
    $status = "Pending";
    $db = new Db();

    $sql_select = "SELECT name, webmail from students WHERE reg_no = :reg_no";
    $db_params_select = ["reg_no" => $db->cleanInput($reg_no)];
    $student = $db->getQuery($sql_select, $db_params_select);
    if ($student > 0) {
        foreach ($student as $student) {
            $name = $student->name;
            $webmail = $student->webmail;
            $sql_insert = "INSERT INTO booking (reg_no, offense, category, status, member_report) VALUES (:reg_no, :offense, :category, :status, :member_report)";
            $db_params_insert = [
                "reg_no" => $db->cleanInput($reg_no),
                "offense" => $db->cleanInput($offense),
                "category" => $db->cleanInput($category),
                "status" => $db->cleanInput($status),
                "member_report" => $db->cleanInput($report),
            ];
            $mail = $db->send__mail("Testing", "Testing the microphone one two...", $webmail, $name);
            // if($mail == true) {
                $book = $db->postQuery($sql_insert, $db_params_insert, $msg = '' . $name . ' has been booked successfully');
            // } else {
            //     return '{"error":{"err_text": "Something wrong happened; Couln\'t book ' . $name . '"}}';
            // }
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
    $db_params = ["reg_no" => $db->cleanInput($reg_no)];
    $student = $db->getQuery($sql, $db_params);
    if ($student > 0) {
        foreach ($student as $student) {
            $name = $student->name;
            $sql_select = "SELECT reg_no FROM booking WHERE reg_no = :reg_no";
            $db_params_select = ["reg_no" => $db->cleanInput($reg_no)];
            $check_offense = $db->getQuery($sql_select, $db_params_select);
            if ($check_offense > 0) {
                $sql_insert = "INSERT INTO punishment (reg_no, punishment) VALUES (:reg_no, :punishment)";
                $db_insert = ["reg_no" => $db->cleanInput($reg_no), "punishment" => $db->cleanInput($punishment)];
                $insert = $db->postQuery($sql_insert, $db_insert);
                $sql_update = "UPDATE booking SET reg_no = :reg_no, punishment = :punishment, status = :status, updated = :updated WHERE id = 1";
                $db_params_update = ["reg_no" => $db->cleanInput($reg_no), "punishment" => $db->cleanInput($punishment), "status" => $db->cleanInput($status), "updated" => $db->cleanInput($updated)];
                $update = $db->postQuery($sql_update, $db_params_update, $msg = "" . $name . " has been asigned a punishment successfully");
            } else {
                return '{"error": {"err_text": "You cannot give ' . $name . ' punishment when not yet booked"}}';
            }
        }
    } else {
        return '{"error": {"err_text": "Student with this registration number ' . $reg_no . ' doesn\'t exist"}}';
    }

});