package com.example.dailydumppostservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class DailydumpPostServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DailydumpPostServiceApplication.class, args);
	}

}
