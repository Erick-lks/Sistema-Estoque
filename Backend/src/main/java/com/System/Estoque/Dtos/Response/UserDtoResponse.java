package com.System.Estoque.Dtos.Response;

import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;




public record UserDtoResponse(@NotEmpty(message = "Cpf é Obrigatorio!")
                                                                @CPF(message = "Cpf inválido") String cpf ,
                              @NotEmpty (message = "A senha é Obrigatoria!") String password) {

}
