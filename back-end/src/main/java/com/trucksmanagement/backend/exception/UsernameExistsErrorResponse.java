package com.trucksmanagement.backend.exception;

public class UsernameExistsErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = -8678209011292429401L;

	public UsernameExistsErrorResponse(String msg) {
		super(409, msg);

	}

}
