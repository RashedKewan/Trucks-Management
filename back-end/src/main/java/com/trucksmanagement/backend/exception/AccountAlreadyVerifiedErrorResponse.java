package com.trucksmanagement.backend.exception;

public class AccountAlreadyVerifiedErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = 4282174580105653852L;

	public AccountAlreadyVerifiedErrorResponse(String msg) {
		super(5001, msg);

	}

}
