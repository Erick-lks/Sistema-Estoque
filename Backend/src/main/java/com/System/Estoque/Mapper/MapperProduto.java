package com.System.Estoque.Mapper;

import org.springframework.stereotype.Component;

import com.System.Estoque.Dtos.ProdutoRequestDto;
import com.System.Estoque.Dtos.ProdutoResponseDto;
import com.System.Estoque.Entity.Produto;

import lombok.Data;

@Component
@Data
public class MapperProduto {

   public Produto toEntity(ProdutoRequestDto dto){
    Produto novo = new Produto();
    novo.setProduto(dto.getProduto());
    novo.setCategoria(dto.getCategoria());
    novo.setQuantidade(dto.getQuantidade());
    return novo;
}

        public ProdutoResponseDto toResponse (Produto entity){
          return new ProdutoResponseDto(
        entity.getId(),
        entity.getProduto(),
        entity.getCategoria(),
        entity.getQuantidade()
    );
        }
    
}
