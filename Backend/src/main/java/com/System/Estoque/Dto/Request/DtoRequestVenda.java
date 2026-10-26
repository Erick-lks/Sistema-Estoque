package com.System.Estoque.Dto.Request;




import com.System.Estoque.Entity.Enum.Plataforma;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DtoRequestVenda {


    @NotBlank
    private Plataforma plataforma;


    @NotEmpty
    private BigDecimal quantidade;
    private int valorTotal;
}
