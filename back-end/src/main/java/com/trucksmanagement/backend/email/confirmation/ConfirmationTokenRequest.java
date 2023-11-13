package com.trucksmanagement.backend.email.confirmation;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationTokenRequest {

	@JsonProperty("token")
	private String token;
	@JsonProperty("requestTo")
	private String requestTo;
}
