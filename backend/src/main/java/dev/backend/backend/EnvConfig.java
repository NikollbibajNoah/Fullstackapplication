package dev.backend.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

@Component
public class EnvConfig {

    private final Dotenv dotenv;

    public EnvConfig() {
        dotenv = Dotenv.load();
    }

    public String get(String key) {
        return dotenv.get(key);
    }
}
