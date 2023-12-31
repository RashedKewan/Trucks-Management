package com.trucksmanagement.backend.auth;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trucksmanagement.backend.config.JwtService;
import com.trucksmanagement.backend.email.EmailService;
import com.trucksmanagement.backend.email.EmailServiceImpl;
import com.trucksmanagement.backend.email.SendEmailRequest;
import com.trucksmanagement.backend.email.confirmation.Confirmation;
import com.trucksmanagement.backend.email.confirmation.ConfirmationService;
import com.trucksmanagement.backend.exception.AccountNotEnabledErrorResponse;
import com.trucksmanagement.backend.exception.EmailExistsErrorResponse;
import com.trucksmanagement.backend.exception.EmailFailedToSendErrorResponse;
import com.trucksmanagement.backend.exception.RegisterFailedErrorResponse;
import com.trucksmanagement.backend.exception.UserDoesNotExistErrorResponse;
import com.trucksmanagement.backend.exception.UsernameExistsErrorResponse;
import com.trucksmanagement.backend.token.Token;
import com.trucksmanagement.backend.token.TokenService;
import com.trucksmanagement.backend.token.TokenType;
import com.trucksmanagement.backend.user.User;
import com.trucksmanagement.backend.user.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserService userService;
	private final ConfirmationService confirmationService;
	private final TokenService tokenService;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final EmailService emailService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request)
			throws UsernameExistsErrorResponse, EmailExistsErrorResponse, RegisterFailedErrorResponse,EmailFailedToSendErrorResponse {
		String username = request.getUsername();
		String email = request.getEmail();

		if (userService.existsByUsername(username)) {
			throw new UsernameExistsErrorResponse("Username taken");
		}

		if (userService.existsByEmail(email)) {
			throw new EmailExistsErrorResponse("Email already registered");
		}
		// check if username exists
		var user = User.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.username(request.getUsername())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.company(request.getCompany())
				.numberOfTrucks(0)
				.city(request.getCity())
				.role(request.getRole())
				.isActive(false)
				.build();
		
		
		var savedUser = userService.save(user);
		if(savedUser == null) {
			throw new RegisterFailedErrorResponse("Failed to save data for: "+user);
		}
		var jwtToken = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(user);
		saveUserToken(savedUser, jwtToken);
		try {
			
			Confirmation confirmation = new Confirmation(user);
			confirmationService.save(confirmation);
			emailService.sendHtmlEmail(user.getFirstname(), user.getEmail(), confirmation.getToken(),EmailServiceImpl.NEW_ACCOUNT_EMAIL_TEMPLATE);
			return AuthenticationResponse.builder()
					.user(user)
					.accessToken(jwtToken)
					.refreshToken(refreshToken)
					.confirmationToken(confirmation.getToken())
					.build();
		}catch (Exception e) {
			throw new EmailFailedToSendErrorResponse("Email Failed To Send");
		}
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) throws AccountNotEnabledErrorResponse {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		var user = userService.findByUsername(request.getUsername()).orElseThrow();
		if (!user.getIsActive()) {
			throw new AccountNotEnabledErrorResponse("Account not Enabled");
		}
		var jwtToken = jwtService.generateToken(user);
		var refreshToken = jwtService.generateRefreshToken(user);
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder().user(user).accessToken(jwtToken).refreshToken(refreshToken).build();
	}

	private void saveUserToken(User user, String jwtToken) {
		var token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.expired(false)
				.revoked(false)
				.build();
		tokenService.save(token);
	}

	private void revokeAllUserTokens(User user) {
		var validUserTokens = tokenService.findAllValidTokenByUser(user.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);

		});
		tokenService.saveAll(validUserTokens);
//		tokenRepository.deleteAll(validUserTokens);
	}

	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userUsername;
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return;
		}
		refreshToken = authHeader.substring(7);
		userUsername = jwtService.extractUsername(refreshToken);
		if (userUsername != null) {
			var user = userService.findByUsername(userUsername).orElseThrow();
			if (jwtService.isTokenValid(refreshToken, user)) {
				var accessToken = jwtService.generateToken(user);
				revokeAllUserTokens(user);
				saveUserToken(user, accessToken);
				var authResponse = AuthenticationResponse.builder()
						.user(user)
						.accessToken(accessToken)
						.refreshToken(refreshToken)
						.build();
				new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
			}
		}
	}

	public boolean resetPasswordRequest(SendEmailRequest request) throws UserDoesNotExistErrorResponse {

		Optional<User> userOptional = userService.findByEmail(request.getEmail());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			Confirmation confirmation = new Confirmation(user);
			confirmationService.save(confirmation);
			emailService.sendHtmlEmail(
					user.getFirstname(), 
					user.getEmail(), 
					confirmation.getToken(),
					EmailServiceImpl.RESET_PASSWORD_EMAIL_TEMPLATE);
			return Boolean.TRUE;
		}
		throw new UserDoesNotExistErrorResponse("User Does Not Exist.");

	}



}
