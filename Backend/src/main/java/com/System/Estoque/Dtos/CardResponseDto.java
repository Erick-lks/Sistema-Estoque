package com.System.Estoque.Dtos;

import lombok.Getter;

@Getter
public class CardResponseDto {

    private int totalItens;
    private long baixoEstoque;
    private int produtosTotal;

    public CardResponseDto(int totalItens , Long baixoEstoque, int produtosTotal){
        this.totalItens = totalItens;
        this.baixoEstoque = baixoEstoque;
        this.produtosTotal = produtosTotal;
    }
    
}
