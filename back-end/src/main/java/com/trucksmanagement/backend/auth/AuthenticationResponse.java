package com.trucksmanagement.backend.auth;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.trucksmanagement.backend.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	@JsonProperty("userDetails")
	private User user;
	@JsonProperty("access_token")
	private String accessToken;
	@JsonProperty("refresh_token")
	private String refreshToken;
	@JsonProperty("confirmation_token")
	private String confirmationToken;
}
