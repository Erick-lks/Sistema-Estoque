
package com.System.Estoque.Security;

import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String token = null;

        String authorization = request.getHeader("Authorization");

        if (authorization != null && authorization.startsWith("Bearer ")) {
            token = authorization.substring(7);
        }

        if (token == null && request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("auth_token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null && !token.isBlank()
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            System.out.println("Método: " + request.getMethod());
            System.out.println("Rota: " + request.getRequestURI());

            DecodedJWT jwt = jwtService.validarTokenCompleto(token);

            if (jwt != null) {
                String cpf = jwt.getSubject();
                String perfil = jwt.getClaim("perfil").asString();

                System.out.println("JWT válido para: " + cpf);
                System.out.println("Perfil: " + perfil);

                if (cpf != null && perfil != null
                        && (perfil.equals("ADMIN") || perfil.equals("GERENTE"))) {

                    var authorities = List.of(
                            new SimpleGrantedAuthority("ROLE_" + perfil)
                    );

                    var authentication =
                            new UsernamePasswordAuthenticationToken(
                                    cpf, null, authorities
                            );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);

                } else {
                    System.out.println("Perfil ausente ou não autorizado.");
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
