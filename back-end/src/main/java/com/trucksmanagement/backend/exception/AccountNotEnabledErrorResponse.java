package com.trucksmanagement.backend.exception;

public class AccountNotEnabledErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = -7964434859251122156L;

	public AccountNotEnabledErrorResponse(String msg) {
		super(410, msg);

	}

}
