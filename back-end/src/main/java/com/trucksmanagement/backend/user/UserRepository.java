package com.trucksmanagement.backend.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);

	User findByEmailIgnoreCase(String email);

	Boolean existsByEmail(String email);

	Boolean existsByUsername(String username);

	Boolean existsByCompany(String company);
}
