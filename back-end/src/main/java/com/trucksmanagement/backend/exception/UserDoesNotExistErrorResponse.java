package com.trucksmanagement.backend.exception;

public class UserDoesNotExistErrorResponse extends ApiException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1816115022153999653L;

	public UserDoesNotExistErrorResponse(String msg) {
		super(5201, msg);

	}

}
