package com.Phoniix.PhoniixPortfolio;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Web configuration for Single Page Application (SPA) routing.
 * 
 * This configuration ensures that all routes are served with index.html,
 * allowing client-side routing to handle navigation without server-side redirects.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${spring.profiles.active:dev}")
    private String activeProfile;

    /**
     * Configure resource handlers to serve static resources and support SPA routing.
     * 
     * For any URL that doesn't match a static resource (like .js, .css, .html files),
     * the server will serve index.html, allowing the client-side router to handle the route.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        
                        // If the requested resource exists (e.g., .js, .css, .html files), return it
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        }
                        
                        // Otherwise, return index.html for SPA routing
                        // This allows URLs like /about, /projects, etc. to work on page refresh
                        return new ClassPathResource("/static/index.html");
                    }
                });
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
                // Only add no-cache headers in development
                if (!"production".equals(activeProfile)) {
                    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Expires", "0");
                }
                return true;
            }
        });
    }
}