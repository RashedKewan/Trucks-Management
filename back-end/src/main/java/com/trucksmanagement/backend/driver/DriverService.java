package com.trucksmanagement.backend.driver;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverService {

	private final DriverRepository repository;
}
