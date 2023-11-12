package com.trucksmanagement.backend.email.confirmation;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trucksmanagement.backend.user.User;


public interface ConfirmationRepository extends JpaRepository<Confirmation, Long> {
    Confirmation findByToken(String token);
    void deleteAllByUser(User user);
}