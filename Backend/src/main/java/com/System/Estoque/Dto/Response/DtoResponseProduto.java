package com.System.Estoque.Dto.Response;

import lombok.Getter;

import java.time.LocalDate;

@Getter

public class DtoResponseProduto {

    private Long id ;
    private String produto;
    private String categoria;
    private Integer quantidade;


    private Boolean isActive;


    private LocalDate dataReativado;



    public DtoResponseProduto(Long id , String produto , String categoria , Integer quantidade, Boolean isActive , LocalDate dataReativado){
        this.id=id;
           this.produto=produto;
        this.categoria=categoria;
     
        this.quantidade=quantidade;
        this.isActive = isActive;

        this.dataReativado=dataReativado;


    }
    
}
