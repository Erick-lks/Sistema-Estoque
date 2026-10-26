package com.System.Estoque.Dto.Response;


import com.System.Estoque.Entity.Enum.Plataforma;

import java.math.BigDecimal;

public record DtoResponseVenda(Long id,
                               Plataforma plataforma,
                               BigDecimal quantidade,
                               int valorTotal) {

}
