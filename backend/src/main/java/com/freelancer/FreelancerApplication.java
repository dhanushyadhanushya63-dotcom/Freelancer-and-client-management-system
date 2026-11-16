package com.freelancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FreelancerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FreelancerApplication.class, args);
        System.out.println("=========================================");
        System.out.println("  Freelancer Backend Started!");
        System.out.println("  API: http://localhost:8080/api");
        System.out.println("  DB Console: http://localhost:8080/h2-console");
        System.out.println("=========================================");
    }
}
