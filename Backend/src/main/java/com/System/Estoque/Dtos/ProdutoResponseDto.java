package com.System.Estoque.Dtos;

import lombok.Getter;

@Getter

public class ProdutoResponseDto {

    private Long id ;
    private String produto;
    private String categoria;
    private Integer quantidade;



    public ProdutoResponseDto(Long id , String produto , String categoria , Integer quantidade){
        this.id=id;
           this.produto=produto;
        this.categoria=categoria;
     
        this.quantidade=quantidade;

    }
    
}
