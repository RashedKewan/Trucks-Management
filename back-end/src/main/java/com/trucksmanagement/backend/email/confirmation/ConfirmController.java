package com.trucksmanagement.backend.email.confirmation;

import com.trucksmanagement.backend.email.SendEmailRequest;
import com.trucksmanagement.backend.exception.AccountAlreadyVerifiedErrorResponse;
import com.trucksmanagement.backend.exception.AccountVerificationFaildErrorResponse;
import com.trucksmanagement.backend.exception.EmailFailedToSendErrorResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class ConfirmController {

	private final ConfirmationService service;

	@PostMapping("/confirm")
	public ResponseEntity<?> confirmUserAccount(@RequestBody ConfirmationTokenRequest request) {
		try {
			return ResponseEntity.ok(service.confirmUserAccount(request));
		} catch (AccountVerificationFaildErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		} catch (AccountAlreadyVerifiedErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}

	}

	@PostMapping("/resend-email")
	public ResponseEntity<?> resendEmail(@RequestBody SendEmailRequest request) {
		try {
			return ResponseEntity.ok(service.resendEmail(request));
		} catch (EmailFailedToSendErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}
	}


}
