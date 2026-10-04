package com.System.Estoque.Controller;


import com.System.Estoque.Dtos.Request.UserDtoRegisterRequest;
import com.System.Estoque.Dtos.Response.LoginResponse;
import com.System.Estoque.Dtos.Response.UserDtoResponse;
import com.System.Estoque.Entity.User;
import com.System.Estoque.Repository.RepositoryUser;
import com.System.Estoque.Services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/Auth")
public class ControllerAuth {
    private final RepositoryUser repositoryUser;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public ControllerAuth(
            RepositoryUser repositoryUser,
            PasswordEncoder passwordEncoder,
            AuthService authService
    ) {
        this.repositoryUser = repositoryUser;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    private static final String SENHA_PADRAO = "estoqueTest";



    @PostMapping("/Registro")
    public ResponseEntity<?> registrodeUsuario( @RequestBody UserDtoRegisterRequest dto){
        Boolean userCpfNew = repositoryUser.existsByCpf(dto.getCpf());

        if(userCpfNew){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario ja Cadastrado!");
        }

        User usernew = new User();
        usernew.setNomeCompleto(dto.getNomeCompleto());
        usernew.setCpf(dto.getCpf());
            usernew.setPassword(passwordEncoder.encode(SENHA_PADRAO));
        usernew.setPerfil(dto.getPerfil());

           repositoryUser.save(usernew);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario criado com sucesso");

    }


    @PostMapping("/Login")
    public ResponseEntity<?> login(@RequestBody UserDtoResponse response) {

        try {
            String token = authService.login(response);

                    User user = repositoryUser.findByCpf(response.cpf()).orElseThrow();

            LoginResponse loginResponse = new LoginResponse(
                    token,
                    user.getNomeCompleto(),
                    user.getPerfil().name()
            );

            return ResponseEntity.ok(loginResponse);
        }catch (RuntimeException  e){
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("CPF ou Senha Invalidos");
        }



    }
}
