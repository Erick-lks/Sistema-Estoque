package com.System.Estoque.Security;


import com.System.Estoque.Entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final Algorithm algorithm;


    public JwtService(@Value("${api.security.token.secret}") String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }


    public String  gerarToken(User user) {

        Instant agora = Instant.now();


        return JWT.create()
                .withIssuer("sistema-estoque")
                .withSubject(user.getCpf())
                .withClaim("perfil", user.getPerfil().name())
                .withIssuedAt(agora)
                .withExpiresAt(agora.plusSeconds(7200))
                .sign(algorithm);
    }

    public  String validadorToken(String token){

        try {
            return JWT.require(algorithm)
                    .withIssuer("sistema-estoque")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (Exception e){
            return null;
        }
    }
}
