package com.Phoniix.PhoniixPortfolio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ErrorLoggingController {
    
    private static final Logger logger = LoggerFactory.getLogger(ErrorLoggingController.class);
    
    /**
     * Endpoint to receive error logs from the frontend
     */
    @PostMapping("/errors")
    public ResponseEntity<String> logError(@RequestBody Map<String, Object> errorData) {
        try {
            // Extract error information
            String context = (String) errorData.get("context");
            String message = (String) errorData.get("message");
            String stack = (String) errorData.get("stack");
            String url = (String) errorData.get("url");
            String userAgent = (String) errorData.get("userAgent");
            String timestamp = (String) errorData.get("timestamp");
            
            // Log the error with different levels based on severity
            if (context != null && context.contains("EmailJS")) {
                logger.error("EMAILJS_ERROR - Context: {}, Message: {}, URL: {}, UserAgent: {}, Timestamp: {}", 
                    context, message, url, userAgent, timestamp);
            } else if (context != null && context.contains("Contact Form")) {
                logger.error("CONTACT_FORM_ERROR - Context: {}, Message: {}, URL: {}, UserAgent: {}, Timestamp: {}", 
                    context, message, url, userAgent, timestamp);
            } else {
                logger.error("FRONTEND_ERROR - Context: {}, Message: {}, URL: {}, UserAgent: {}, Timestamp: {}", 
                    context, message, url, userAgent, timestamp);
            }
            
            // Log stack trace if available
            if (stack != null && !stack.isEmpty()) {
                logger.debug("Stack trace: {}", stack);
            }
            
            // Log additional data if present
            if (errorData.containsKey("formData")) {
                logger.info("Form data at time of error: {}", errorData.get("formData"));
            }
            
            return ResponseEntity.ok("Error logged successfully");
            
        } catch (Exception e) {
            logger.error("Failed to log frontend error", e);
            return ResponseEntity.status(500).body("Failed to log error");
        }
    }
    
    /**
     * Endpoint to receive success logs from the frontend
     */
    @PostMapping("/success")
    public ResponseEntity<String> logSuccess(@RequestBody Map<String, Object> successData) {
        try {
            String context = (String) successData.get("context");
            String url = (String) successData.get("url");
            String timestamp = (String) successData.get("timestamp");
            
            logger.info("FRONTEND_SUCCESS - Context: {}, URL: {}, Timestamp: {}", 
                context, url, timestamp);
            
            // Log additional success data
            if (successData.containsKey("duration")) {
                logger.info("Operation duration: {}ms", successData.get("duration"));
            }
            
            return ResponseEntity.ok("Success logged");
            
        } catch (Exception e) {
            logger.error("Failed to log frontend success", e);
            return ResponseEntity.status(500).body("Failed to log success");
        }
    }
    
    /**
     * Health check endpoint for error logging service
     */
    @GetMapping("/errors/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "timestamp", LocalDateTime.now().toString(),
            "service", "Error Logging Controller"
        ));
    }
    
    /**
     * Simple test endpoint to verify API is working
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        logger.info("Test endpoint called");
        return ResponseEntity.ok(Map.of(
            "message", "API is working",
            "timestamp", LocalDateTime.now().toString()
        ));
    }
}
