package com.trucksmanagement.backend.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;
import java.util.List;

/**
 * The `WebConfig` class is a Spring configuration class that configures Cross-Origin Resource Sharing (CORS) for the application.
 */
@Configuration
@EnableWebMvc
public class WebConfig {

    private static final Long MAX_AGE = 3600L;
    private static final int CORS_FILTER_ORDER = -102;

    /**
     * Configures a CORS filter for allowing cross-origin requests.
     *
     * - Sets up a CORS configuration that allows credentials, specifies allowed origins, headers, and HTTP methods.
     * - Registers the CORS configuration for all endpoints.
     * - Sets the filter order to ensure that it runs before the Spring Security filter.
     *
     * @return A `FilterRegistrationBean` for the CORS filter.
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.setAllowedHeaders(List.of(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT));
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name()));
        config.setMaxAge(MAX_AGE);
        config.addExposedHeader(HttpHeaders.AUTHORIZATION);
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(source));

        // Set the filter order to ensure that the CORS filter runs before the Spring Security filter.
        bean.setOrder(CORS_FILTER_ORDER);
        return bean;
    }
}