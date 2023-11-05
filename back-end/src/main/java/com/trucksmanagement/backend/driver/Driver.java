package com.trucksmanagement.backend.driver;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.trucksmanagement.backend.truck.Truck;
import com.trucksmanagement.backend.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "driver")
public class Driver {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	private String firstname;
	private String lastname;
	@Column(unique = true)
	private Integer identityNumber;

	@JsonBackReference
	@ManyToOne(cascade =  CascadeType.ALL, optional = false)
	@JoinColumn(name = "user_id")
	private User user;
	
	
	@JsonBackReference
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "truck_id")
	private Truck truck;

}
