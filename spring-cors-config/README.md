# Spring API Gateway – CORS configuration

Use this in your **Spring (Java) API gateway** project so the React frontend can call it without CORS errors (including "Invalid CORS request" when saving products).

## Default: allow any origin (global, permanent)

All configs now **allow any origin by default**: any scheme (http/https), any host, any port. CORS is applied globally to `/**`.

To **restrict** to specific origins, set in `application.properties`:
```properties
cors.allow-all=false
cors.allowed-origins=http://localhost:3000,https://myapp.example.com
```

---

## Option 1: WebMvcConfigurer (recommended when you do **not** use Spring Security)

1. Copy `WebMvcCorsConfig.java` into your gateway project, e.g.  
   `src/main/java/<your-package>/config/WebMvcCorsConfig.java`
2. Change the `package` to match your project (e.g. `package com.example.gateway.config;`).
3. Restart the gateway.

This applies CORS to all `/**` endpoints: any origin, any method, any header. Set `cors.allow-all=false` and `cors.allowed-origins=...` to restrict.

---

## Option 1b: Spring Security (use this if you have Spring Security)

**"Invalid CORS request"** often comes from Spring Security. Add CORS at the Security layer (any origin by default):

1. Copy `SecurityCorsConfig.java` into your gateway (e.g. `config` package).
2. In your **Security configuration** (class with `@EnableWebSecurity` that configures `SecurityFilterChain`), enable CORS using the bean:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            // ... your other rules (authorizeRequests, etc.)
            ;
        return http.build();
    }
}
```

3. Restart the gateway. Use **either** `WebMvcCorsConfig` **or** `SecurityCorsConfig` with Security; if both are present, Security’s CORS is the one that matters for avoiding "Invalid CORS request".

---

## Option 2: Filter (if WebMvcConfigurer is not enough)

Use `CorsFilterExample.java` if you use Spring Security or need CORS before MVC (e.g. error controllers). Copy it into your `config` package and fix the package name.

- **Spring Boot 3**: uses `jakarta.servlet` (as in the file).
- **Spring Boot 2**: replace `jakarta.servlet` with `javax.servlet`.

Use **either** WebMvcConfigurer **or** this Filter, not both, to avoid duplicate headers.

---

## Option 3: @CrossOrigin on controllers

Use `ControllerCrossOriginExample.java` as a reference. Add `@CrossOrigin(...)` on each controller (or base class) that serves the frontend. Prefer Option 1 for one global setup.

---

## After adding CORS

1. Restart the API gateway (port 7777).
2. Reload the React app and retry the request.
