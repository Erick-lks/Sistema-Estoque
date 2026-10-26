package com.System.Estoque.Dto.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DtoRequestProduto {

    
    private Long id;


    @NotBlank(message = "Nome do produto é obrigatório!")
    private String produto;

    @NotBlank(message = "Categoria é obrigatório!")
    private String categoria;

    @Min(value = 0, message = "Quantidade não pode ser negativa")
    private Integer quantidade;


    
}
