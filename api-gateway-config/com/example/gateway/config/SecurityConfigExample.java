package com.example.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * Example Security config that wires CORS into the filter chain.
 * Copy this into your gateway and merge with your existing SecurityFilterChain
 * (or add only the .cors(...) line to your existing config).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfigExample {

    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfigExample(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()  // replace with your rules
                )
                .csrf(csrf -> csrf.disable());  // adjust as needed for your API

        return http.build();
    }
}
