package com.System.Estoque.Services;


import com.System.Estoque.Dtos.Response.UserDtoResponse;
import com.System.Estoque.Entity.User;
import com.System.Estoque.Repository.RepositoryUser;
import com.System.Estoque.Security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final RepositoryUser repositoryUser;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(RepositoryUser repositoryUser , PasswordEncoder passwordEncoder , JwtService jwtService){
     this.repositoryUser = repositoryUser;
     this.passwordEncoder= passwordEncoder;
     this.jwtService= jwtService;

    }


    public String login(UserDtoResponse dto){
        User user = repositoryUser.findByCpf(dto.cpf()).orElseThrow(() -> new RuntimeException("CPF não Encontrado!"));


        if(!passwordEncoder.matches((dto.password()), user.getPassword())){
            throw  new RuntimeException("CPF ou Senha inválidos");
        }

        return jwtService.gerarToken(user);

    }


}
