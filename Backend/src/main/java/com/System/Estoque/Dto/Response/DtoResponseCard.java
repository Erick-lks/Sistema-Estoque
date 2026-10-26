package com.System.Estoque.Dto.Response;

import lombok.Getter;

@Getter
public class DtoResponseCard {

    private int totalItens;
    private long baixoEstoque;
    private int produtosTotal;

    public DtoResponseCard(int totalItens , Long baixoEstoque, int produtosTotal){
        this.totalItens = totalItens;
        this.baixoEstoque = baixoEstoque;
        this.produtosTotal = produtosTotal;
    }
    
}
