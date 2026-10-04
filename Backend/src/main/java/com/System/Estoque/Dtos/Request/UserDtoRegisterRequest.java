package com.System.Estoque.Dtos.Request;


import com.System.Estoque.Entity.Enum.Perfil;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDtoRegisterRequest {

    private String nomeCompleto;
    private String cpf;
    private String password;

    private Perfil perfil;
}
