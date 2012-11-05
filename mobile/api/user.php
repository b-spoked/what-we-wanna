<?php
class User {
	public $dp;

	static $FIELDS = array('name', 'email');

	function __construct(){
		$this->dp = new DB_PDO_MySQL();
	}

	function get($id=NULL) {
		return is_null($id) ? $this->dp->getAll() : $this->dp->get($id);
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
		$user=array();
		foreach (User::$FIELDS as $field) {
//you may also vaildate the data here
			if(!isset($data[$field]))throw new RestException(417,"$field field missing");
			$user[$field]=$data[$field];
		}
		return $user;
	}
}