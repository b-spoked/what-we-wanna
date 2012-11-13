<?php
require_once 'config.php';
class User {
	public $userData;

	static $FIELDS = array('name', 'email','password','newsletter');

	function __construct(){
		$this->userData = new UserData();
	}

	function get($id=NULL) {
		return $this->userData->get($id) ;
	}
	
	function login(){
		return $this->userData->login($email,$pw);
	}
	
	/**
	* @url GET /email/:email/
	*/
	function getByEmail($email=NULL) {
		return $this->userData->getByEmail($email);
	}
	
	/**
	* @url GET /todos/:id/
	*/
	function getTodos($id=NULL) {
		//return $this->userData->getTodos($id);
	}
	
	/**
	* @url GET /recommended/:id/
	*/
	function getRecommended($id=NULL) {
		//return $this->userData->getRecommended($id);
	}
	
	/**
	* @url GET /created/:id/
	*/
	function getCreated($id=NULL) {
		//return $this->userData->getCreated($id);
	}
	
	function post($request_data=NULL) {
		return $this->userData->insert($this->_validate($request_data));
	}
	
	function put($id=NULL, $request_data=NULL) {
		return $this->userData->update($id, $request_data);
	}
	function delete($id=NULL) {
		return $this->userData->delete($id);
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