package com.trip.teamTrip;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.trip.teamTrip.mapper")
public class TeamTripApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamTripApplication.class, args);
	}

}
