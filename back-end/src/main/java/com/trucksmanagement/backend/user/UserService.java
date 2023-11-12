package com.trucksmanagement.backend.user;

import lombok.RequiredArgsConstructor;

import org.springframework.data.util.Pair;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucksmanagement.backend.email.VerificationStatus;
import com.trucksmanagement.backend.email.confirmation.Confirmation;
import com.trucksmanagement.backend.email.confirmation.ConfirmationRepository;

import java.security.Principal;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository repository;
	private final ConfirmationRepository confirmationRepository;

	/**
	 * JUST IN CASE THE USER IS LOGGED IN
	 * 
	 * @param request
	 * @param connectedUser
	 */
	public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

		var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

		// check if the current password is correct
		if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
			throw new IllegalStateException("Wrong password");
		}
		// check if the two new passwords are the same
		if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
			throw new IllegalStateException("Password are not the same");
		}

		// update the password
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));

		// save the new password
		repository.save(user);
	}

	public VerificationStatus verifyToken(String token) {
		Confirmation confirmation = confirmationRepository.findByToken(token);
		if (confirmation == null) {
			return VerificationStatus.FAIL;
		}
		User user = repository.findByEmailIgnoreCase(confirmation.getUser().getEmail());
		if (user.getIsActive()) {
			return VerificationStatus.ALREADY_VERIFIED;
		}
		user.setIsActive(true);
		repository.save(user);
		return VerificationStatus.SUCCESS;
	}

	public Optional<User> findByEmail(String email) {
		return repository.findByEmail(email);
	}

	public boolean existsByUsername(String username) {
		return repository.existsByUsername(username);
	}

	public boolean existsByEmail(String email) {
		return repository.existsByEmail(email);
	}

	public User save(User user) {
		return repository.save(user);
	}

	@Transactional
	public Optional<User> findByUsername(String username) {
		return repository.findByUsername(username);
	}
}
