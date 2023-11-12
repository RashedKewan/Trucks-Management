package com.trucksmanagement.backend.exception;

public class EmailFailedToSendErrorResponse extends ApiException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2857191377528729027L;

	public EmailFailedToSendErrorResponse(String message) {
		super(5101, message);
	}

}
