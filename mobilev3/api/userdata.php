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
            $sql = 'SELECT id, name, email FROM user WHERE id = ' . mysql_escape_string(
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
            
	    $queryString = "SELECT id, name, email FROM user WHERE email = '{$email}' AND password = SHA1('$pw')";
            return $this->id2int($this->db->query($queryString)->fetch());
            
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
            
           $queryString = "SELECT id, name, description, address, latitude, longitude, recommended FROM place LEFT JOIN user_todo_place ON user_todo_place.todo_id = place.id WHERE user_todo_place.user_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getTodos($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getUsersThatRecommend($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name FROM user LEFT JOIN user_recommended_place ON user_recommended_place.user_id = user.id WHERE user_recommended_place.recommended_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getUsersThatRecommend($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getUsersToDo($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name FROM user LEFT JOIN user_todo_place ON user_todo_place.user_id = user.id WHERE user_todo_place.todo_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getUsersToDo($id, TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getRecommended($id, $installTableOnFailure = FALSE){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name, description, address, latitude, longitude, recommended FROM place LEFT JOIN user_recommended_place ON user_recommended_place.recommended_id =place.id WHERE user_recommended_place.user_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
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
            
            $queryString = "SELECT id, name, description, address, latitude, longitude, recommended FROM place LEFT JOIN user_created_place ON user_created_place.created_id =place.id WHERE user_created_place.user_id = '{$id}'";
	    return $this->id2int($this->db->query($queryString)->fetchAll());
            
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
        //$password= mysql_escape_string($rec['password']);
        $newsletter= mysql_escape_string($rec['newsletter']);
        $todos = mysql_escape_string($rec['todos']);
        $recommended = mysql_escape_string($rec['recommended']);
	
        $sql = "INSERT INTO user (name,email,newsletter,updated_at) VALUES ('$name', '$email',' $newsletter', NOW())";  
    
	if (!$this->db->query($sql)){
            return FALSE;
	}
	
	$id = $this->get($this->db->lastInsertId());
	
	$this->insertTodos($id,$todos);
	$this->insertRecommended($id,$recommended);
	
	return $id;
        
    }
    
    function update ($id, $rec)
    {
	$name = mysql_escape_string($rec['name']);
        $email = mysql_escape_string($rec['email']);
        //$password= mysql_escape_string($rec['password']);
        $newsletter= false; //mysql_escape_string($rec['newsletter']);
        $todos = $rec['todos'];
        $recommended = $rec['recommended'];
	
        $sql = "UPDATE user SET name = '$name', email ='$email', newsletter ='$newsletter', updated_at=NOW() WHERE id = $id";
        
	if (! $this->db->query($sql)){
            return FALSE;
	}
	$this->insertTodos($id,$todos);
	$this->insertRecommended($id,$recommended);
	
        return $this->get($id);
    }
    
    function insertRecommended($id,$recommended){
	
	foreach ($recommended as $recommended_id)
	{
	   $sql = " INSERT IGNORE INTO user_recommended_place (user_id,recommended_id) VALUES ('$id','$recommended_id')";
	   $this->db->query($sql);
	}
    }
    
    function insertTodos($id,$todos){
	
	foreach ($todos as $todo_id)
	{
	   $sql = " INSERT IGNORE INTO user_todo_place (user_id,todo_id) VALUES ('$id','$todo_id')";
	   $this->db->query($sql);
	}
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
	    newsletter BOOL NOT NULL,
	    password VARCHAR(40) NOT NULL,
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
        "INSERT INTO user (name, email,password, newsletter,updated_at) VALUES ('Demo Dave','demo.dave@whatwewanna.co.nz','test123',0,NOW());
        INSERT INTO user (name, email,password, newsletter,updated_at) VALUES ('Demo Daisy','demo.daisey@whatwewanna.co.nz','test123',1,NOW());
	INSERT INTO user (name, email,password, newsletter,updated_at) VALUES ('Demo Donna','demo.donna@whatwewanna.co.nz','test123,1,NOW());
            ");
    }
}