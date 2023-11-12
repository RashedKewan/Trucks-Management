package com.trucksmanagement.backend.email.confirmation;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucksmanagement.backend.email.EmailService;
import com.trucksmanagement.backend.email.ResendEmailRequest;
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
	
	public boolean confirmUserAccount(String token)
			throws AccountAlreadyVerifiedErrorResponse, AccountVerificationFaildErrorResponse {
		VerificationStatus status = userService.verifyToken(token);
		switch (status) {
		case SUCCESS:{
			return Boolean.TRUE;
		}case FAIL: {
			throw new AccountVerificationFaildErrorResponse("Account Verification Faild");
		}
		case ALREADY_VERIFIED: {
			throw new AccountAlreadyVerifiedErrorResponse("Account Already Verified");
		}
		default:
			return Boolean.FALSE;
		}
	}

	public boolean resendEmail(ResendEmailRequest request) {
	    try {
	        Optional<User> userOpt = userService.findByEmail(request.getEmail());
	        userOpt.ifPresent(user -> {
	        	this.deleteAllByUser(user);
	            Confirmation confirmation = new Confirmation(user);
	            this.save(confirmation);
	            emailService.sendHtmlEmail(user.getFirstname(), user.getEmail(), confirmation.getToken());
	        });

	        return true;
	    } catch (Exception e) {
	    	System.out.println(e.getMessage());
	        throw new EmailFailedToSendErrorResponse("Email Failed To Send!");
	    }
	}
}
