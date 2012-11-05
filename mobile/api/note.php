<?php
class Note {
	public $dp;

	static $FIELDS = array('name', 'description','address','latitude','longitude','tags','rating','createdby','approved');

	function __construct(){
		$this->dp = new DB_PDO_MySQL();
	}

	function get($id=NULL) {
		return is_null($id) ? $this->dp->getAll() : $this->dp->get($id);
	}
	
	/**
	* @url GET /tag/:tag/
	*/
	function getByTag($tag=NULL) {
	    
		return $this->dp->getByTag($tag);
	    
	}
	
	/**
	* @url GET /filter/:keyword/
	*/
	function getByKeyWord($keyword=NULL) {
	    
		return $this->dp->getByKeyword($keyword);
	    
	}
	
	/**
	* @url GET /date/:start/:finish/
	*/
	function getByDate($start=NULL,$finish=NULL) {
	    
		return $this->dp->getByDate($start,$finish);
	    
	}
	
	function post($request_data=NULL) {
		return $this->dp->insert($this->_validate($request_data));
	}
	function put($id=NULL, $request_data=NULL) {
		return $this->dp->update($id, $this->_validate($request_data));
	}
	function delete($id=NULL) {
		return $this->dp->delete($id);
	}

	private function _validate($data){
		$note=array();
		foreach (Note::$FIELDS as $field) {
//you may also vaildate the data here
			if(!isset($data[$field]))throw new RestException(417,"$field field missing");
			$note[$field]=$data[$field];
		}
		return $note;
	}
}