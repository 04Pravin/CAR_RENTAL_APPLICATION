package com.carApp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;


@Entity
public class User{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "user_sequence")
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_seq")
	private Integer id;
	
	private String username;
	private String password;
	private long mobileNumber;
	private String roles;

	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String username, String password, long mobileNumber, String roles) {
		super();
		this.username = username;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.roles = roles;
	}



	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public long getMobileNumber() {
		return mobileNumber;
	}



	public void setMobileNumber(long mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	
	

	public String  getRoles() {
		return roles;
	}

	public void setRole(String roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", mobileNumber=" + mobileNumber + "]";
	}

	



}
