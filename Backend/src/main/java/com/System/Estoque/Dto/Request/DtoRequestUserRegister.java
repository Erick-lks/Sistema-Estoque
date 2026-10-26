package com.System.Estoque.Dto.Request;


import com.System.Estoque.Entity.Enum.Perfil;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoRequestUserRegister {

    private String nomeCompleto;
    private String cpf;
    private String password;

    private Perfil perfil;
}
