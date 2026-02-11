package com.nikhilsingh.strategy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class MissionController {

    @GetMapping("/api/classified-missions")
    public List<Map<String, String>> getMissions() {
        return List.of(
            Map.of("code", "OP_NOVUS", "status", "ACTIVE", "intel", "Face swap tech operational."),
            Map.of("code", "OP_TUBE", "status", "STANDBY", "intel", "Downloading protocols ready.")
        );
    }
}
