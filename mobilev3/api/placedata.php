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
class PlaceData
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
            $sql = 'SELECT name, description, address, latitude, longitude, recommended, updated_at, id FROM place WHERE id = ' . mysql_escape_string(
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
    
    function getRecommendedUsers($id){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name FROM user LEFT JOIN user_recommended_place ON user_recommended_place.user_id = user.id WHERE user_recommended_place.recommended_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getTodoUsers($id){
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
	    
	    $queryString = "SELECT id, name FROM user LEFT JOIN user_todo_place ON user_todo_place.user_id = user.id WHERE user_todo_place.todo_id = '{$id}'";
	    
            return $this->id2int($this->db->query($queryString)->fetchAll());
            
        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getAll ($installTableOnFailure = FALSE)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $stmt = $this->db->query('SELECT name, description, address, latitude, longitude, recommended, updated_at, id FROM place');
            return $this->id2int($stmt->fetchAll());
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getAll(TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function getByFilter($filters,$installTableOnFailure = FALSE)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        parse_str($filters,$values);
        $location = $values['locationfilter'];
	$type = $values['typefilter'];
        
        try {
            $query = "SELECT name, description, address, latitude, longitude, recommended, updated_at, id FROM place WHERE address LIKE '%{$location}%'";
	    
	    if($type){
		$query .= " AND name LIKE '%{$type}%' OR description LIKE '%{$type}%'";
	    }
	    
            $stmt = $this->db->query($query);
            return $this->id2int($stmt->fetchAll());
        } catch (PDOException $e) {
            if (! $installTableOnFailure && $e->getCode() == '42S02') {
//SQLSTATE[42S02]: Base table or view not found: 1146 Table 'authors' doesn't exist
                $this->install();
                return $this->getAll(TRUE);
            }
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }
    
    function insert ($rec)
    {
        $name = mysql_escape_string($rec['name']);
        $description = mysql_escape_string($rec['description']);
        $address = mysql_escape_string($rec['address']);
        $latitude = mysql_escape_string($rec['latitude']);
        $longitude = mysql_escape_string($rec['longitude']);
        $recommended = mysql_escape_string($rec['recommended']);
        $updated_at = mysql_escape_string($rec['updated_at']);
        
        $user_id = 1;
	//name, description, address, latitude, longitude, recommended, updated_at, id
        $sql = "INSERT INTO place (name,description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('$name', '$description','$address','$latitude','$longitude','$recommended','$user_id',NOW())";  
        if (! $this->db->query($sql))
            return FALSE;
        return $this->get($this->db->lastInsertId());
    }
    
    function update ($id, $rec)
    {
        $id = mysql_escape_string($id);
        $name = mysql_escape_string($rec['name']);
        $description = mysql_escape_string($rec['description']);
        $address = mysql_escape_string($rec['address']);
        $latitude = mysql_escape_string($rec['latitude']);
        $longitude = mysql_escape_string($rec['longitude']);
        $recommended = mysql_escape_string($rec['recommended']);
	
        $sql = "UPDATE place SET name = '$name', description ='$description', address ='$address', latitude ='$latitude',longitude ='$longitude', recommended='$recommended' updated_at=NOW() WHERE id = $id";
        if (! $this->db->query($sql))
            return FALSE;
        return $this->get($id);
    }
    
    function updateAddress ($id, $address)
    {
        $id = mysql_escape_string($id);
        $address = mysql_escape_string($address);
        $sql = "UPDATE place SET address ='$address' WHERE id = $id";
        if (! $this->db->query($sql))
            return FALSE;
        return $this->get($id);
    }
    
    function delete ($id)
    {
        $r = $this->get($id);
        if (! $r || ! $this->db->query(
        'DELETE FROM place WHERE id = ' . mysql_escape_string($id)))
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
	
	//'name', 'description','address','latitude','longitude','recommended'
	
        $this->db->exec(
        "CREATE TABLE place (
            id INT AUTO_INCREMENT PRIMARY KEY ,
            name TEXT NOT NULL ,
            description TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude TEXT NOT NULL,
            longitude TEXT NOT NULL,
            recommended INT,
            user_id INT,
            updated_at DATETIME
        );");
        
        $this->db->exec(
        "INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Beach Walk','Beach loop from the back beach ending at the playground','Back Beach Road, Tahunanui, Demovile','-41.285974','173.23166',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Valley Playground','A great little playground that has become a family fav with a new play house and good swings','Pioneer Park, Washington Valley, Demovile','-41.272525','173.275487',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Model Train Ride','A hit with the whole family are the great train rides at the modelers pond - they even have Thomas!','Modelers pond, Tahunanui, Demovile','-41.281806','173.24388',5,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Park','A good size park with lots of trees to climb and heaps of room to play cricket or kick around a ball','Back Beach Road, Tahunanui, Demovile','-41.285974','173.23166',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Toilets','Clean toilets with a change table for the little ones','Pioneer Park, Washington Valley, Demovile','-41.272525','173.275487',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Park and Lake','Big park with trees, lots of grass a small lake and plenty of wildlife','Big Park, Tahunanui, Demovile','-41.281806','173.24388',5,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Forrest Walk','Walk through native forrest - nice wide track that is flat and suited to buggy or kids on small bikes','Back Beach Road, Tahunanui, Demovile','-41.285974','173.23166',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Museum','This Museum is great on a rainey day (or any day actually) with exhibits aimed at the kids and that are interactive to keep them entertained.','Pioneer Park, Washington Valley, Demovile','-41.272525','173.275487',3,1,NOW());
        INSERT INTO place (name, description,address,latitude,longitude, recommended,user_id,updated_at) VALUES ('Demo Big Playground','Playground that suits all ages (well under 10) with a seprate toddlers area. Swings, slides, climbing structures','Big Park, Tahunanui, Demovile','-41.281806','173.24388',5,1,NOW());
            ");
    }
}