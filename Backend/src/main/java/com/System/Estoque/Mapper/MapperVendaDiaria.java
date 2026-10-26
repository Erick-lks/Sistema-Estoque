package com.System.Estoque.Mapper;


import com.System.Estoque.Dto.Response.DtoResponseVendaDiaria;
import com.System.Estoque.Dto.Response.DtoResponseVenda;
import com.System.Estoque.Entity.VendaDiaria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class MapperVendaDiaria {

    @Autowired
    private MapperVenda vendaMapper;

    public DtoResponseVendaDiaria toResponse(VendaDiaria entity) {

        List<DtoResponseVenda> vendas = entity.getVendasList()
                .stream()
                .map(vendaMapper::toResponse)
                .toList();

        return new DtoResponseVendaDiaria(
                entity.getId(),
                entity.getData(),
                entity.getValorTotalDiario(),
                vendas);
    }
}
