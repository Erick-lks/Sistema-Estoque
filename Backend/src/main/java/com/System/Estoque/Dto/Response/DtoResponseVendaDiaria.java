
package com.System.Estoque.Dto.Response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class DtoResponseVendaDiaria {

    private Long id;
    private LocalDate data;
    private BigDecimal valorTotalDiario;
    private List<DtoResponseVenda> vendasList;

    public DtoResponseVendaDiaria(
            Long id,
            LocalDate data,
            BigDecimal valorTotalDiario,
            List<DtoResponseVenda> vendasList) {

        this.id = id;
        this.data = data;
        this.valorTotalDiario = valorTotalDiario;
        this.vendasList = vendasList;
    }
}
