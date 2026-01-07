package com.infosys.lostFoundApplication.config;

// CORRECTED import for Spring Security's Customizer
import org.springframework.security.config.Customizer; 

// REQUIRED imports for HttpServletRequest, HttpServletResponse, and Authentication

// Other existing imports
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// Assuming EncoderConfig is in this package or needs an import
 
 

@Configuration
@EnableMethodSecurity
public class SystemConfig {
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
    }
	
	@Bean
	 SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 
	    http
	      .cors(Customizer.withDefaults()) // Uses the correct Spring Security Customizer
	      .csrf(csrf -> csrf.disable())
	      .authorizeHttpRequests(auth -> auth
	            .requestMatchers("/lostfound/login/**").permitAll()
	            .requestMatchers("/lostfound/logout").permitAll()
	            .requestMatchers("/lostfound/**","/lostfound/register").permitAll()
	            .anyRequest().authenticated()
	      )
	      .logout(logout -> logout
	            .logoutUrl("/lostfound/logout")
	            .invalidateHttpSession(true)
	            .deleteCookies("JSESSIONID")
	            // Request, response, and authentication objects are now resolvable due to new imports
	            .logoutSuccessHandler((request, response, authentication) -> {
	                response.setStatus(200);
	                response.getWriter().write("Logout success");
	            })
	      );
 
	    return http.build();
	}

    // ✅ Added CORS bean
    @Bean
     WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3535")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowCredentials(true);
            }
        };
    }
}
