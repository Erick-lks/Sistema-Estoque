package com.System.Estoque.Dtos;

import lombok.Getter;

import javax.swing.text.StyledEditorKit;
import java.time.LocalDate;

@Getter

public class ProdutoResponseDto {

    private Long id ;
    private String produto;
    private String categoria;
    private Integer quantidade;
    private Boolean status;
    private LocalDate dataExclusao;



    public ProdutoResponseDto(Long id , String produto , String categoria , Integer quantidade
    ,Boolean status , LocalDate dataExclusao){
        this.id=id;
           this.produto=produto;
        this.categoria=categoria;
     
        this.quantidade=quantidade;
this .status = status;
this.dataExclusao=dataExclusao;
    }
    
}
