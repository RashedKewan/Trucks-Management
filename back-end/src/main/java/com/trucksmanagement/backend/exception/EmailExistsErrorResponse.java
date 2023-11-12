package com.trucksmanagement.backend.exception;

public class EmailExistsErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = 3654848427768755179L;

	public EmailExistsErrorResponse(String msg) {
		super(5100, msg);

	}

}
