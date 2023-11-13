package com.trucksmanagement.backend.email;

public class EmailUtils {

	public static String getEmailMessage(String name, String host, String token) {
		return "Hello " + name
				+ ",\n\nYour new account has been created. Please click the link below to verify your account. \n\n"
				+ getVerificationUrl(host, token, EmailServiceImpl.NEW_USER_ACCOUNT_VERIFICATION)
				+ "\n\nThe support Team";
	}

	public static String getVerificationUrl(String host, String token, String emailTemplate) {
		final String tokenParam = "?token=" + token;
		String api = "";
		switch (emailTemplate) {
		case EmailServiceImpl.NEW_ACCOUNT_EMAIL_TEMPLATE: {
			api = "/new-account-email-verifying";
			break;

		}

		case EmailServiceImpl.RESET_PASSWORD_EMAIL_TEMPLATE: {
			api = "/reset-password-email-verifying";
			break;
		}

		default:
			api = "/new-account-email-verifying";
			break;
		}
		return host + api + tokenParam;
	}
}