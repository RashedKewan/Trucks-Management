package com.trucksmanagement.backend.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trucksmanagement.backend.email.SendEmailRequest;
import com.trucksmanagement.backend.exception.AccountNotEnabledErrorResponse;
import com.trucksmanagement.backend.exception.EmailExistsErrorResponse;
import com.trucksmanagement.backend.exception.EmailFailedToSendErrorResponse;
import com.trucksmanagement.backend.exception.RegisterFailedErrorResponse;
import com.trucksmanagement.backend.exception.ResetPasswordIncorrectUsenameErrorResponse;
import com.trucksmanagement.backend.exception.UserDoesNotExistErrorResponse;
import com.trucksmanagement.backend.exception.UsernameExistsErrorResponse;
import com.trucksmanagement.backend.user.ResetPasswordRequest;
import com.trucksmanagement.backend.user.UserService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		try {
			return ResponseEntity.ok(authenticationService.register(request));

		} catch (EmailExistsErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());

		} catch (UsernameExistsErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());

		} catch (EmailFailedToSendErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
			
		} catch (RegisterFailedErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
		try {
			return ResponseEntity.ok(authenticationService.authenticate(request));
		} catch (AccountNotEnabledErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}

	}

	@PostMapping("/refresh-token")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		authenticationService.refreshToken(request, response);
	}

	@PostMapping("/reset-password-request")
	public ResponseEntity<?> resetPasswordRequest(@RequestBody SendEmailRequest request) {
		try {
			return ResponseEntity.ok().body(authenticationService.resetPasswordRequest(request));
		} catch (EmailFailedToSendErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
			
		} catch (UserDoesNotExistErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
			
		}
	}
	/**
	 * @PatchMapping annotation is used to handle HTTP PATCH requests. The PATCH
	 *               method is typically used for partial updates to a resource.
	 *               Unlike PUT, which is used to update the entire resource, PATCH
	 *               is used to apply partial modifications to the resource.
	 */
	@PatchMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
		try {

			userService.resetPassword(request);
			return ResponseEntity.ok().body(Boolean.TRUE);
		} catch (ResetPasswordIncorrectUsenameErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}
	}
	

}
