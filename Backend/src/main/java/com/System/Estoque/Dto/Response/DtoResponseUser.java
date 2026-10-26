package com.System.Estoque.Dto.Response;

import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;




public record DtoResponseUser(@NotEmpty(message = "Cpf é Obrigatorio!")
                                                                @CPF(message = "Cpf inválido") String cpf ,
                              @NotEmpty (message = "A senha é Obrigatoria!") String password) {

}
