package com.System.Estoque.Mapper;

import org.springframework.stereotype.Component;

import com.System.Estoque.Dto.Request.DtoRequestProduto;
import com.System.Estoque.Dto.Response.DtoResponseProduto;
import com.System.Estoque.Entity.Produto;

import lombok.Data;

@Component
@Data
public class MapperProduto {

   public Produto toEntity(DtoRequestProduto dto){
    Produto novo = new Produto();
    novo.setProduto(dto.getProduto());
    novo.setCategoria(dto.getCategoria());
    novo.setQuantidade(dto.getQuantidade());
    return novo;
}

        public DtoResponseProduto toResponse (Produto entity){
          return new DtoResponseProduto(
        entity.getId(),
        entity.getProduto(),
        entity.getCategoria(),
        entity.getQuantidade(),
                  entity.getIsActive(),
                  entity.getDataReativado()

    );
        }
    
}
