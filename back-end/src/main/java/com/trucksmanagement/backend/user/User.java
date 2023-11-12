package com.trucksmanagement.backend.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.trucksmanagement.backend.email.confirmation.Confirmation;
import com.trucksmanagement.backend.token.Token;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "users")
public class User implements UserDetails {

	private static final long serialVersionUID = -7135803238159487810L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@JsonIgnore
	private Long id;
	private String firstname;
	private String lastname;

	@Column(unique = true)
	private String username;

	@Column(unique = true)
	private String email;
	@JsonIgnore
	private String password;

	@Column(unique = true)
	private String company;
	private Integer numberOfTrucks;
	private String city;
	private Boolean isActive;
	@Enumerated(EnumType.STRING)
	private Role role;

//	@JsonManagedReference
//	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
//	private List<Authority> authorities = new ArrayList<Authority>();

//	@JsonManagedReference
//	@OneToMany(mappedBy = "user")
//	private List<Token> tokens;
	
//	@JsonManagedReference
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private List<Confirmation> confirmations;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return role.getAuthorities();
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}