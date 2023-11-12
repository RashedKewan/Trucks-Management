package com.trucksmanagement.backend.exception;

import lombok.Getter;
import lombok.Setter;


public class ApiException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -189833369555144519L;
	@Getter
	@Setter
	private int code;

	public ApiException(int code, String msg) {
		super(msg);
		this.code = code;
	}

}
