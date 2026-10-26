
package com.System.Estoque.Security;

import com.System.Estoque.Entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JwtService(
            @Value("${api.security.token.secret}") String secret
    ) {
        this.algorithm = Algorithm.HMAC256(secret);

        this.verifier = JWT.require(algorithm)
                .withIssuer("sistema-estoque")
                .build();
    }

    public String gerarToken(User user) {
        Instant agora = Instant.now();

        return JWT.create()
                .withIssuer("sistema-estoque")
                .withSubject(user.getCpf())
                .withClaim("perfil", user.getPerfil().name())
                .withIssuedAt(agora)
                .withExpiresAt(agora.plusSeconds(7200))
                .sign(algorithm);
    }


    public DecodedJWT validarTokenCompleto(String token) {
        try {
            return verifier.verify(token);
        } catch (com.auth0.jwt.exceptions.JWTVerificationException e) {
            System.err.println(
                    "Erro ao validar JWT: "
                            + e.getClass().getSimpleName()
                            + " - "
                            + e.getMessage()
            );
            return null;
        }
    }


}
