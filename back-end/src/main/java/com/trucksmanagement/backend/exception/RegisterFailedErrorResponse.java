package com.trucksmanagement.backend.exception;

public class RegisterFailedErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1123783604543324799L;

	public RegisterFailedErrorResponse(String msg) {
		super(5050, msg);

	}

}
