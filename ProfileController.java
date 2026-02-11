package com.nikhilsingh.profile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class ProfileController {

    public static void main(String[] args) {
        SpringApplication.run(ProfileController.class, args);
    }

    @GetMapping("/api/profile")
    public Map<String, Object> getProfile() {
        return Map.of(
            "name", "Nikhil Singh",
            "title", "AI Architect // Reality Bender",
            "status", "ONLINE",
            "location", "India Node"
        );
    }

    @GetMapping("/api/projects")
    public List<Map<String, String>> getProjects() {
        return List.of(
            Map.of("id", "1", "name", "NOVUSFACE AI", "type", "DEEPFAKE_ENGINE", "desc", "4K Real-time Face Swapping Architecture."),
            Map.of("id", "2", "name", "TUBEMAN", "type", "VIDEO_PIPELINE", "desc", "High-throughput video extraction bot."),
            Map.of("id", "3", "name", "SEOMAN PRO", "type", "RANKING_BOT", "desc", "Automated SEO Warfare Suite.")
        );
    }
}
