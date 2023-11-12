package com.trucksmanagement.backend.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trucksmanagement.backend.exception.AccountNotEnabledErrorResponse;
import com.trucksmanagement.backend.exception.EmailExistsErrorResponse;
import com.trucksmanagement.backend.exception.RegisterFailedErrorResponse;
import com.trucksmanagement.backend.exception.UsernameExistsErrorResponse;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService service;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
		try {
			return ResponseEntity.ok(service.register(request));
			
		} catch (EmailExistsErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
			
		} catch (UsernameExistsErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());

		} catch (RegisterFailedErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
		try {
			return ResponseEntity.ok(service.authenticate(request));
		} catch (AccountNotEnabledErrorResponse e) {
			return ResponseEntity.badRequest().body(e.getCode());
		}

	}

	@PostMapping("/refresh-token")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		service.refreshToken(request, response);
	}

}
