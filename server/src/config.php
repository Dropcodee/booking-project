<?php
class Db
{
    protected $dbhost = "localhost";
    protected $dbname = "revo";
    protected $dbuser = "root";
    protected $dbpass = "";

    public function connect()
    {
        $dsn = 'mysql:host=' . $this->dbhost . ';dbname=' . $this->dbname . '';
        $dbcon = new PDO($dsn, $this->dbuser, $this->dbpass);
        $dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbcon;
    }

    /*************************************************************
     ******************** GET QUERY FUNCTION **********************
     *************************************************************/
    public function getQuery($sql, $params = null)
    {
        try {
            // Connection to Database
            $pdo = $this->connect();
            // Query
            $statement = $pdo->prepare($sql);
            // Get the parameters and execute them
            $statement->execute($params);
            // Check if there is data in the database
            $count = $statement->rowCount();
            if ($count > 0) {
                return $statement->fetchAll(PDO::FETCH_OBJ);
            } else {
                return false;
            }
            $pdo = null;
        } catch (PDOException $e) {
            echo '{"error": {"err_text": "' . $e->getMessage() . '"}}';
        }
    }

    /************************************************************
     ******************** POST QUERY FUNCTION ********************
     ************************************************************/
    public function postQuery($sql, $params = null, $msg = null)
    {
        try {
            // Connection to Database
            $pdo = $this->connect();

            // Query
            $statement = $pdo->prepare($sql);

            ##### Get the parameters and execute them    #####
            $statement->execute($params);

            ##### Print out the Response #####
            echo ($msg !== null) ? '{"success": {"success_text": "' . $msg . '"}}' : "";

            // Close the Connection
            $pdo = null;
        } catch (PDOException $e) {
            echo '{"error": {"err_text": "' . $e->getMessage() . '"}}';
        }
    }

    public function checkmail($webmail)
    {
        $sql = "SELECT webmail FROM users WHERE webmail = :webmail";
        $db_param = ["webmail" => $webmail];
        $check = $this->getQuery($sql, $db_param);
        if ($check > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function checkreg_no($reg_no)
    {
        $sql = "SELECT reg_no FROM users WHERE reg_no = :reg_no";
        $db_param = ["reg_no" => $reg_no];
        $check = $this->getQuery($sql, $db_param);
        if ($check > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function checkmatric()
    {
        $sql = "SELECT matric FROM users";
        $check = $this->getQuery($sql);
        if ($check > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function Ago($datetime)
    {
        $time = strtotime($datetime);
        $current = time();

        return date('M j, Y g:i A', $time);
    }

    public function mail($subject, $body, $address)
    {
        require '../sendgrid/vendor/autoload.php';
        $FROM_EMAIL = 'noreply-sanctuary@hiddenhyve.org';
        // they dont like when it comes from @gmail, prefers business emails
        $TO_EMAIL = $address;
        // Try to be nice. Take a look at the anti spam laws. In most cases, you must
        // have an unsubscribe. You also cannot be misleading.
        $subject = $subject;
        $from = new SendGrid\Email(null, $FROM_EMAIL);
        $to = new SendGrid\Email(null, $TO_EMAIL);
        $htmlContent = $body;
        // Create Sendgrid content
        $content = new SendGrid\Content("text/html", $htmlContent);
        // Create a mail object
        $mail = new SendGrid\Mail($from, $subject, $to, $content);

        $sg = new \SendGrid("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");
        $response = $sg->client->mail()->send()->post($mail);

        if ($response->statusCode() == 202) {
            // Successfully sent
            echo '{"success":{"success_text":"A verification code has been sent to ' . $address . '"}}';
        } else {
            echo '{"error":{"err_text": "Something wrong happened; Couln\'t send a mail to ' . $address . '"}}';
        }
    }

    public function generate_username($string_name = "revo", $rand_no = 100)
    {
        $username_parts = array_filter(explode(" ", strtolower($string_name))); //explode and lowercase name
        $username_parts = array_slice($username_parts, 0, 2); //return only first two arry part

        $part1 = (!empty($username_parts[0])) ? substr($username_parts[0], 0, 8) : ""; //cut first name to 8 letters
        $part2 = (!empty($username_parts[1])) ? substr($username_parts[1], 0, 5) : ""; //cut second name to 5 letters
        $part3 = ($rand_no) ? rand(0, $rand_no) : "";

        $username = $part1 . str_shuffle($part2) . $part3; //str_shuffle to randomly shuffle all characters
        return $username;
    }

    public function search($search)
    {
        $names = explode(" ", $search);
        $reg_no = explode(" ", $search);
        $statement = $this->connect()->prepare("SELECT * FROM students WHERE reg_no LIKE :mention OR reg_no LIKE '%$reg_no[0]%' OR name LIKE :mention OR name LIKE '%$names[0]%'");
        $statement->bindValue(':mention', $search . '%');
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }
}