package com.trucksmanagement.backend.exception;

public class AccountVerificationFaildErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = 3035723913533489266L;

	public AccountVerificationFaildErrorResponse(String msg) {
		super(5000, msg);

	}

}
