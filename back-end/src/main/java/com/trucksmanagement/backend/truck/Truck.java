package com.trucksmanagement.backend.truck;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.trucksmanagement.backend.driver.Driver;
import com.trucksmanagement.backend.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "truck")
public class Truck {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	@Column(unique = true)
	private String licenseNumber;
	private Integer weight;

	@JsonBackReference
	@ManyToOne(optional = false, cascade = CascadeType.ALL)
	private User user;

	
	@JsonManagedReference
	@OneToOne(mappedBy = "truck", cascade = CascadeType.ALL)
	private Driver driver;
}
