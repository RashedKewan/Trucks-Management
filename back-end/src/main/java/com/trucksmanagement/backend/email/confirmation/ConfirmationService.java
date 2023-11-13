package com.trucksmanagement.backend.email.confirmation;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucksmanagement.backend.email.EmailService;
import com.trucksmanagement.backend.email.EmailServiceImpl;
import com.trucksmanagement.backend.email.SendEmailRequest;
import com.trucksmanagement.backend.email.VerificationStatus;
import com.trucksmanagement.backend.exception.AccountAlreadyVerifiedErrorResponse;
import com.trucksmanagement.backend.exception.AccountVerificationFaildErrorResponse;
import com.trucksmanagement.backend.exception.EmailFailedToSendErrorResponse;
import com.trucksmanagement.backend.user.User;
import com.trucksmanagement.backend.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ConfirmationService {
	private final ConfirmationRepository repository;
	private final EmailService emailService;
	private final UserService userService;

	@Transactional
	public Confirmation save(Confirmation confirmation) {
		return repository.save(confirmation);
	}

	@Transactional
	public void deleteAllByUser(User user) {
		repository.deleteAllByUser(user);
	}

	public ConfirmationTokenResponse confirmUserAccount(ConfirmationTokenRequest request)
			throws AccountAlreadyVerifiedErrorResponse, AccountVerificationFaildErrorResponse {
		ConfirmationTokenResponse response = userService.verifyToken(request);
		switch (VerificationStatus.valueOf(response.getStatus())) {
		case SUCCESS: {
			return response;
		}
		case FAIL: {
			throw new AccountVerificationFaildErrorResponse("Account Verification Faild");
		}
		case ALREADY_VERIFIED: {
			throw new AccountAlreadyVerifiedErrorResponse("Account Already Verified");
		}
		default:
			return response;
		}

	}

	public boolean resendEmail(SendEmailRequest request) {
		try {
			Optional<User> userOpt = userService.findByEmail(request.getEmail());
			userOpt.ifPresent(user -> {
				this.deleteAllByUser(user);
				Confirmation confirmation = new Confirmation(user);
				this.save(confirmation);
				emailService.sendHtmlEmail(user.getFirstname(), user.getEmail(), confirmation.getToken(),
						EmailServiceImpl.NEW_ACCOUNT_EMAIL_TEMPLATE);
			});

			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			throw new EmailFailedToSendErrorResponse("Email Failed To Send!");
		}
	}
}
