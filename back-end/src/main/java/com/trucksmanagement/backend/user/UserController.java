package com.trucksmanagement.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trucksmanagement.backend.exception.ResetPasswordIncorrectUsenameErrorResponse;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService service;

	/**
	 * @PatchMapping annotation is used to handle HTTP PATCH requests. The PATCH
	 *               method is typically used for partial updates to a resource.
	 *               Unlike PUT, which is used to update the entire resource, PATCH
	 *               is used to apply partial modifications to the resource.
	 */
	@PatchMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
		service.changePassword(request, connectedUser);
		return ResponseEntity.ok().build();
	}

	
}
