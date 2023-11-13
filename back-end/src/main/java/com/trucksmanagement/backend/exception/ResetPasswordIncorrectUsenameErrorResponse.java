package com.trucksmanagement.backend.exception;

public class ResetPasswordIncorrectUsenameErrorResponse extends ApiException {


	/**
	 * 
	 */
	private static final long serialVersionUID = -2929452562068752723L;

	public ResetPasswordIncorrectUsenameErrorResponse(String msg) {
		super(5200, msg);

	}

}
