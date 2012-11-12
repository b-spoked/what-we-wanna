<?php
/**
 * MySQL DB. All data is stored in data_pdo_mysql database
 * Create an empty MySQL database and set the dbname, username
 * and password below
 * 
 * This class will create the table with sample data
 * automatically on first `get` or `get($id)` request
 */
require_once 'config.php';
class UserData
{
    private $db;
    function __construct(){
	
	try {
            $this->db = new PDO(DB_SERVER, DB_USER, DB_PASSWORD);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, 
            PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
     }
    
    function get ($id, $installTableOnFailure = FALSE)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $sql = 'SELECT name,email FROM user WHERE id = ' . mysql_escape_string(
            $id);
            return $this->id2int($this->db->query($sql)
                ->fetch());
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->get($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    
    function getByEmail($email, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            
            $stmt = $this->db->query("SELECT name FROM user WHERE email = '{$email}'");
            return $this->id2int($stmt->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getByEmail($email, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
   function login($email,$pw, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            
            $stmt = $this->db->query("SELECT id FROM user WHERE email = '{$email}' AND password='SHA1({$pw})'");
            return $this->id2int($this->db->query($stmt)->fetch());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->login($email,$pw, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }	
    
    function getTodos($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            
           $queryString = "SELECT id, name, description, address, latitude, longitude, recommeded FROM place LEFT JOIN (user_todo_place) ON user_todo_place.todo_id =notes.id) WHERE user_todo_place.user_id = '{$id}'";
	    
            $stmt = $this->db->query($queryString);
            return $this->id2int($stmt->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getTodos($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getRecomended($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name, description, address, latitude, longitude, recommeded FROM place LEFT JOIN (user_recommended_place) ON user_recommended_place.recommended_id =notes.id) WHERE user_recommended_place.user_id = '{$id}'";
	    
            $stmt = $this->db->query($queryString);
            return $this->id2int($stmt->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getRecomended($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getCreated($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            
            $queryString = "SELECT id, name, description, address, latitude, longitude, recommeded FROM place LEFT JOIN (user_created_place) ON user_created_place.created_id =notes.id) WHERE user_created_place.user_id = '{$id}'";
	    
            $stmt = $this->db->query($queryString);
            return $this->id2int($stmt->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getCreated($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function insert ($rec)
    {
        $name = mysql_escape_string($rec['name']);
        $email = mysql_escape_string($rec['email']);
        $password= mysql_escape_string($rec['password']);
	
        $sql = "INSERT INTO user (name,email,password,updated_at) VALUES ('$name', '$email', SHA1('$password'),NOW())";  
        if (! $this->db->query($sql))
            return FALSE;
        return $this->get($this->db->lastInsertId());
    }
    
    function update ($id, $rec)
    {
	$name = mysql_escape_string($rec['name']);
        $email = mysql_escape_string($rec['email']);
        $password= mysql_escape_string($rec['password']);
	
        $sql = "UPDATE user SET name = '$name', email ='$email', password = SHA1('$password'), updated_at=NOW() WHERE id = $id";
        if (! $this->db->query($sql))
            return FALSE;
        return $this->get($id);
    }
    
    function delete ($id)
    {
        $r = $this->get($id);
        if (! $r || ! $this->db->query(
        'DELETE FROM user WHERE id = ' . mysql_escape_string($id)))
            return FALSE;
        return $r;
    }
    private function id2int ($r)
    {
        if (is_array($r)) {
            if (isset($r['id'])) {
                $r['id'] = intval($r['id']);
            } else {
                foreach ($r as &$r0) {
                    $r0['id'] = intval($r0['id']);
                }
            }
        }
        return $r;
    }
    private function install ()
    {
        $this->db->exec(
        "CREATE TABLE user (
            id INT AUTO_INCREMENT PRIMARY KEY ,
            name TEXT NOT NULL ,
            email TEXT NOT NULL,
	    password VARCHAR(40),
            updated_at DATETIME
        );");
	
	//rcommended places relationship
	$this->db->exec(
        "CREATE TABLE user_recommended_place
	(
	    user_id INT REFERENCES user (id),
	    recommended_id INT REFERENCES place (id),
	    PRIMARY KEY (user_id, recommended_id)
	);");
	//todo places relationship
	$this->db->exec(
        "CREATE TABLE user_todo_place
	(
	    user_id INT REFERENCES user (id),
	    todo_id INT REFERENCES place (id),
	    PRIMARY KEY (user_id, todo_id)
	);");
	//create places relationship
	$this->db->exec(
        "CREATE TABLE user_created_place
	(
	    user_id INT REFERENCES user (id),
	    created_id INT REFERENCES place (id),
	    PRIMARY KEY (user_id, created_id)
	);");
	//demo data
	$this->db->exec(
        "INSERT INTO user (name, email,updated_at) VALUES ('Demo Dave','demo.dave@whatwewanna.co.nz',NOW());
        INSERT INTO user (name, email,updated_at) VALUES ('Demo Daisy','demo.daisey@whatwewanna.co.nz',NOW());
	INSERT INTO user (name, email,updated_at) VALUES ('Demo Donna','demo.donna@whatwewanna.co.nz',NOW());
            ");
    }
}