package com.trucksmanagement.backend.token;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TokenService {
	private final TokenRepository repository;

	public List<Token> findAllValidTokenByUser(Long id) {
		return repository.findAllValidTokenByUser(id);
	}

	public Optional<Token> findByToken(String token) {
		return repository.findByToken(token);
	}

	@Transactional
	public Token save(Token token) {
		return repository.save(token);
	}

	@Transactional
	public void saveAll(List<Token> validUserTokens) {
		repository.saveAll(validUserTokens);
	}
}
