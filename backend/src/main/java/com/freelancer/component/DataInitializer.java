package com.freelancer.component;

import com.freelancer.model.User;
import com.freelancer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("freelancer@demo.com")) {
            User freelancer = new User();
            freelancer.setName("Dhanushya R");
            freelancer.setEmail("freelancer@demo.com");
            freelancer.setPassword(passwordEncoder.encode("admin123"));
            freelancer.setRole("FREELANCER");
            freelancer.setPhone("9876543210");
            freelancer.setCompany("DK Creative Studio");
            userRepository.save(freelancer);
        }

        if (!userRepository.existsByEmail("client@demo.com")) {
            User client = new User();
            client.setName("Arjun Sharma");
            client.setEmail("client@demo.com");
            client.setPassword(passwordEncoder.encode("admin123"));
            client.setRole("CLIENT");
            client.setPhone("9123456789");
            client.setCompany("TechCorp Solutions");
            userRepository.save(client);
        }

        System.out.println("✅ Demo users ready!");
        System.out.println("   freelancer@demo.com / admin123");
        System.out.println("   client@demo.com     / admin123");
    }
}
