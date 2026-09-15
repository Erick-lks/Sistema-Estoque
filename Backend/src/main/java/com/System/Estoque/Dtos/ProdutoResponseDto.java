package com.System.Estoque.Dtos;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter

public class ProdutoResponseDto {

    private Long id ;
    private String produto;
    private String categoria;
    private Integer quantidade;

    private Boolean isActive;
    private LocalDate dataDeInativacao;

    private LocalDate dataReativado;



    public ProdutoResponseDto(Long id , String produto , String categoria , Integer quantidade, Boolean isActive , LocalDate dataDeInativacao , LocalDate dataReativado){
        this.id=id;
           this.produto=produto;
        this.categoria=categoria;
     
        this.quantidade=quantidade;
        this.isActive = isActive;
        this.dataDeInativacao = dataDeInativacao;
        this.dataReativado=dataReativado;


    }
    
}
