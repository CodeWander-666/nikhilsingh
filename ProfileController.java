// ProfileController.java
package com.nikhilsingh.neuralnexus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ProfileController {

    @GetMapping("/status")
    public Map<String, String> getSystemStatus() {
        return Map.of(
            "operator", "Nikhil Singh",
            "status", "OPTIMAL",
            "security_level", "MAXIMUM"
        );
    }

    @GetMapping("/projects")
    public List<Map<String, Object>> getProjects() {
        // In a real app, this would fetch from a database
        return List.of(
            Map.of("name", "NovusFace", "tech", "Python/PyTorch", "prio", "HIGH"),
            Map.of("name", "SEO Vision", "tech", "Automation", "prio", "MED")
        );
    }
}
