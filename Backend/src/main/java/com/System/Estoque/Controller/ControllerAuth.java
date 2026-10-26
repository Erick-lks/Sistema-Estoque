package com.System.Estoque.Controller;

import com.System.Estoque.Dto.Request.DtoRequestUserRegister;
import com.System.Estoque.Dto.Response.LoginResponse;
import com.System.Estoque.Dto.Response.DtoResponseUser;
import com.System.Estoque.Entity.User;
import com.System.Estoque.Repository.RepositoryUser;
import com.System.Estoque.Service.ServiceAuth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/Auth")
public class ControllerAuth {
    private final RepositoryUser repositoryUser;
    private final PasswordEncoder passwordEncoder;
    private final ServiceAuth authService;

    @Value("${app.cookie.secure:true}")
    private boolean cookieSecure;

    public ControllerAuth(
            RepositoryUser repositoryUser,
            PasswordEncoder passwordEncoder,
            ServiceAuth authService
            ) {
        this.repositoryUser = repositoryUser;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;

    }

    private static final String SENHA_PADRAO = "estoqueTest";

    @PostMapping("/Registro")
    public ResponseEntity<?> registrodeUsuario(@RequestBody DtoRequestUserRegister dto) {
        Boolean userCpfNew = repositoryUser.existsByCpf(dto.getCpf());

        if (userCpfNew) {
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
    public ResponseEntity<?> login(@RequestBody DtoResponseUser response) {
        try {
            String token = authService.login(response);

            User user = repositoryUser
                    .findByCpf(response.cpf())
                    .orElseThrow();

            ResponseCookie jwtCookie = ResponseCookie
                    .from("auth_token", token)
                    .httpOnly(true)
                    .secure(cookieSecure)
                    .path("/")
                    .maxAge(Duration.ofMinutes(10))
                    .sameSite("None")
                    .build();

            LoginResponse loginResponse = new LoginResponse(
                    user.getNomeCompleto(),
                    user.getPerfil().name()
            );

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(loginResponse);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("CPF ou senha inválidos");
        }
    }


    }

