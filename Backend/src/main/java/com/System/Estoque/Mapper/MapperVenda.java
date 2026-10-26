package com.System.Estoque.Mapper;


import com.System.Estoque.Dto.Request.DtoRequestVenda;
import com.System.Estoque.Dto.Response.DtoResponseVenda;

import com.System.Estoque.Entity.Venda;
import lombok.Data;
import org.springframework.stereotype.Component;


@Component
@Data
public class MapperVenda {

    public Venda toEntity(DtoRequestVenda dto){
        Venda novo = new Venda();
        novo.setPlataforma(dto.getPlataforma());
        novo.setQuantidade(dto.getQuantidade());
        novo.setValorTotal(dto.getValorTotal());
        return novo;
    }

    public DtoResponseVenda toResponse (Venda entity){
        return new DtoResponseVenda(
                entity.getId(),
                entity.getPlataforma(),
                entity.getQuantidade(),
                entity.getValorTotal()

        );
    }

}
