package config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Use this when your gateway has Spring Security.
 * Allows any origin (any scheme, host, port) by default. Set cors.allow-all=false to restrict.
 * Enable CORS in your Security filter chain (see README).
 */
@Configuration
public class SecurityCorsConfig {

    @Value("${cors.allow-all:true}")
    private boolean allowAllOrigins;

    @Value("${cors.allowed-origins:}")
    private String allowedOriginsConfig;

    private static final List<String> ALL_ORIGINS_PATTERN = Collections.singletonList("*");

    private List<String> getOriginPatterns() {
        if (allowAllOrigins) {
            return ALL_ORIGINS_PATTERN;
        }
        if (allowedOriginsConfig != null && !allowedOriginsConfig.isBlank()) {
            List<String> fromConfig = Arrays.stream(allowedOriginsConfig.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
            if (!fromConfig.isEmpty()) {
                return fromConfig;
            }
        }
        return ALL_ORIGINS_PATTERN;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(getOriginPatterns());
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setExposedHeaders(Collections.singletonList("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(86400L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
