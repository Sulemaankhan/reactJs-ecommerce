package config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Global CORS configuration for the API gateway.
 * Allows any origin (any scheme, host, port) when cors.allow-all=true or when no origins are configured.
 * Set cors.allow-all=false and cors.allowed-origins=... to restrict to specific origins.
 */
@Configuration
public class WebMvcCorsConfig implements WebMvcConfigurer {

    @Value("${cors.allow-all:true}")
    private boolean allowAllOrigins;

    @Value("${cors.allowed-origins:}")
    private String allowedOriginsConfig;

    /** Allow any origin: any http/https, any host, any port. */
    private static final String[] ALL_ORIGINS_PATTERN = {"*"};

    private String[] getOriginPatterns() {
        if (allowAllOrigins) {
            return ALL_ORIGINS_PATTERN;
        }
        if (allowedOriginsConfig != null && !allowedOriginsConfig.isBlank()) {
            List<String> fromConfig = Arrays.stream(allowedOriginsConfig.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
            if (!fromConfig.isEmpty()) {
                return fromConfig.toArray(new String[0]);
            }
        }
        return ALL_ORIGINS_PATTERN;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(getOriginPatterns())
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(true)
                .maxAge(86400);
    }
}
