package com.System.Estoque.Service;


import com.System.Estoque.Dto.Response.DtoResponseUser;
import com.System.Estoque.Entity.User;
import com.System.Estoque.Repository.RepositoryUser;
import com.System.Estoque.Security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceAuth {

    private final RepositoryUser repositoryUser;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ServiceAuth(RepositoryUser repositoryUser , PasswordEncoder passwordEncoder , JwtService jwtService){
     this.repositoryUser = repositoryUser;
     this.passwordEncoder= passwordEncoder;
     this.jwtService= jwtService;

    }




    public String login(DtoResponseUser dto){
        User user = repositoryUser.findByCpf(dto.cpf()).orElseThrow(() -> new RuntimeException("CPF não Encontrado!"));


        if(!passwordEncoder.matches((dto.password()), user.getPassword())){
            throw  new RuntimeException("CPF ou Senha inválidos");
        }

        return jwtService.gerarToken(user);

    }


}
