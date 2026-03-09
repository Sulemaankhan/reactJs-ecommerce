package config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Alternative: CORS via Filter. Allows any origin (any http/https, host, port) when cors.allow-all=true.
 * Use this if WebMvcConfigurer is not enough (e.g. Spring Security or non-MVC gateway).
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilterExample implements Filter {

    @Value("${cors.allow-all:true}")
    private boolean allowAllOrigins;

    @Value("${cors.allowed-origins:}")
    private String allowedOriginsConfig;

    private boolean isOriginAllowed(String origin) {
        if (origin == null || origin.isEmpty()) return false;
        if (allowAllOrigins) return true;
        if (allowedOriginsConfig != null && !allowedOriginsConfig.isBlank()) {
            List<String> allowed = Arrays.stream(allowedOriginsConfig.split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());
            return allowed.contains("*") || allowed.contains(origin);
        }
        return true;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        String origin = request.getHeader("Origin");
        if (origin != null && isOriginAllowed(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        }
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Expose-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "86400");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(req, res);
    }
}
