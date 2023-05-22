package com.igor.corsandcsrf.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

@Bean
SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
  return http
      .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> {
        auth.requestMatchers("/notices").permitAll();
        auth.requestMatchers("/myAccount").authenticated();
      })
      .cors(cors -> cors.configurationSource(corsConfig()))
      .csrf(csrf -> csrf.ignoringRequestMatchers("contactForm"))
      .httpBasic(Customizer.withDefaults())
      .build();
}

  @Bean
  CorsConfigurationSource corsConfig() {
    List<String> allowedOrigins = new ArrayList<>();
    allowedOrigins.add("http://localhost:4200");

    CorsConfiguration cors = new CorsConfiguration();
    cors.setAllowedOrigins(allowedOrigins);

    cors.setAllowedMethods(Arrays.asList("GET", "POST"));
    cors.setAllowedHeaders(Arrays.asList("Authorization"));
    cors.setAllowCredentials(true);
    cors.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cors);
    return source;
  }
}
