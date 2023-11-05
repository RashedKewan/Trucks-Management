package com.trucksmanagement.backend.truck;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TruckService {
	private final TruckRepository repository;
}
