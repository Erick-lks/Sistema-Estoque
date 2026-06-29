package com.System.Estoque.Services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.System.Estoque.Dtos.CardResponseDto;
import com.System.Estoque.Dtos.ProdutoRequestDto;
import com.System.Estoque.Dtos.ProdutoResponseDto;
import com.System.Estoque.Entity.Produto;
import com.System.Estoque.Mapper.MapperProduto;
import com.System.Estoque.Repository.RepositoryProduto;




@Service
public class ServicesProduto{

  private final MapperProduto mapper = new MapperProduto();

    @Autowired
    private RepositoryProduto repository;
  

 public ResponseEntity<Page<ProdutoResponseDto>> listarTodos(
        Pageable pageable
) {

    Page<Produto> produto = repository.findAll(pageable);

    if (produto.isEmpty()) {
        return ResponseEntity.noContent().build();
    }

    Page<ProdutoResponseDto> response = produto.map(mapper::toResponse);

    return ResponseEntity.ok(response);
}


  public ResponseEntity<ProdutoResponseDto> listarporId (@PathVariable Long id ){


    return repository.findById(id)
    .map(mapper::toResponse)
    .map(ResponseEntity::ok)
    .orElse(ResponseEntity.notFound().build());

  }


  public ResponseEntity<Page<ProdutoResponseDto>> buscandoItem(
        String categoria,
        Pageable pageable
) {

    Page<Produto> produto;

    if (categoria == null || categoria.isBlank()) {
        produto = repository.findAll(pageable);
    } else {
        produto = repository.findByCategoriaContainingIgnoreCase(categoria, pageable);
    }

    Page<ProdutoResponseDto> response =
            produto.map(mapper::toResponse);

    return ResponseEntity.ok(response);
}


public ResponseEntity<Page<ProdutoResponseDto>> baixoEstoque (Pageable pageable){

  Page<Produto> produto = repository.findByQuantidadeLessThan(10 , pageable);

Page<ProdutoResponseDto> response = produto.map(mapper::toResponse);

  return ResponseEntity.ok(response);

 

}
  public ResponseEntity<?> cadastrarNovoProduto (@RequestBody ProdutoRequestDto dto){

    Produto entity = mapper.toEntity(dto);
    Produto produtoNovo = repository.save(entity);

 
  

return  ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(produtoNovo));
  }


  public ProdutoResponseDto aletrarproduto (@PathVariable Long id , @RequestBody ProdutoRequestDto dto){

      Produto produotExiste = repository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não Encontrado"));


  produotExiste.setProduto(dto.getProduto());
    produotExiste.setCategoria(dto.getCategoria());
    produotExiste.setQuantidade(dto.getQuantidade());
  


    Produto produtoalteradocomsucesso = repository.save(produotExiste);

    return mapper.toResponse(produtoalteradocomsucesso);
  }

  public ResponseEntity<?> removerProduto (@PathVariable Long id ){

      Produto produto = repository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));

   repository.delete(produto);

   return ResponseEntity.noContent().build();
  }


public CardResponseDto findAllItens() {

    List<Produto> produtos = repository.findAll();

    int totalItens = produtos.stream()
            .mapToInt(Produto::getQuantidade)
            .sum();

    long baixoEstoque = produtos.stream()
            .filter(p -> p.getQuantidade() < 15)
            .count();

    int produtosTotal = produtos.size();

    return new CardResponseDto(
            totalItens,
            baixoEstoque,
            produtosTotal
    );
}


}
