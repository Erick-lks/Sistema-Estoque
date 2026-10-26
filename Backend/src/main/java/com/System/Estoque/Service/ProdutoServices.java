package com.System.Estoque.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.System.Estoque.Exeption.NenhumProdutoEncontradoExecption;
import com.System.Estoque.Exeption.RecursoNaoEncontradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.System.Estoque.Dto.Response.DtoResponseCard;
import com.System.Estoque.Dto.Request.DtoRequestProduto;
import com.System.Estoque.Dto.Response.DtoResponseProduto;
import com.System.Estoque.Entity.Produto;
import com.System.Estoque.Mapper.MapperProduto;
import com.System.Estoque.Repository.RepositoryProduto;

@Service
public class ProdutoServices {

  private final MapperProduto mapper = new MapperProduto();

  @Autowired
  private RepositoryProduto repository;

  public ResponseEntity<Page<DtoResponseProduto>> listarTodos(
      Pageable pageable) {

    Page<Produto> produto = repository.findByIsActiveTrue(pageable);

    if (produto.isEmpty()) {
      throw new NenhumProdutoEncontradoExecption("Nenhum produto encontrado!");
    }

    Page<DtoResponseProduto> response = produto.map(mapper::toResponse);

    return ResponseEntity.ok(response);
  }

  public ResponseEntity<DtoResponseProduto> listarporId(@PathVariable Long id) {

    return repository.findById(id)
        .map(mapper::toResponse)
        .map(ResponseEntity::ok)
            .orElseThrow(() ->
                    new RecursoNaoEncontradoException(
                            "Produto não encontrado com o ID: " + id
                    )
            );

  }

  public ResponseEntity<Page<DtoResponseProduto>> buscandoItem(
      String categoria,
      Pageable pageable) {

    Page<Produto> produto;

    if (categoria == null || categoria.isBlank()) {
      produto = repository.findAll(pageable);
    } else {
      produto = repository.findByCategoriaContainingIgnoreCase(categoria, pageable);
    }

    Page<DtoResponseProduto> response = produto.map(mapper::toResponse);

    return ResponseEntity.ok(response);
  }

  public ResponseEntity<Page<DtoResponseProduto>> baixoEstoque(Pageable pageable) {

    Page<Produto> produto = repository.findByQuantidadeLessThan(10, pageable);

    Page<DtoResponseProduto> response = produto.map(mapper::toResponse);

    return ResponseEntity.ok(response);

  }

  public ResponseEntity<?> cadastrarNovoProduto(@RequestBody DtoRequestProduto dto) {

    Produto entity = mapper.toEntity(dto);
    Produto produtoNovo = repository.save(entity);

    return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(produtoNovo));
  }

  public DtoResponseProduto aletrarproduto(@PathVariable Long id, @RequestBody DtoRequestProduto dto) {

    Produto produotExiste = repository.findById(id).orElseThrow(() ->
            new RecursoNaoEncontradoException(
                    "Produto não encontrado com o ID: " + id
            )
    );

    produotExiste.setProduto(dto.getProduto());
    produotExiste.setCategoria(dto.getCategoria());
    produotExiste.setQuantidade(dto.getQuantidade());

    Produto produtoalteradocomsucesso = repository.save(produotExiste);

    return mapper.toResponse(produtoalteradocomsucesso);
  }

  public ResponseEntity<?> removerProduto(@PathVariable Long id) {

    Optional<Produto> produto = repository.findById(id);

    if (produto.isEmpty()) {
      throw new NenhumProdutoEncontradoExecption(
              "Nenhum produto para Remover!"
      );
    }

    Produto produtoget = produto.get();

    produtoget.setIsActive(false);

    repository.save(produtoget);

    return ResponseEntity.ok().build();
  }
  public ResponseEntity<?> restaurarProduto(@PathVariable Long id) {

    Optional<Produto> produto = repository.findById(id);

    if (produto.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Produto produtoget = produto.get();

    produtoget.setIsActive(true);
    produtoget.setDataReativado(LocalDate.now());

    repository.save(produtoget);

    return ResponseEntity.ok().build();
  }

  public DtoResponseCard findAllItens() {


    List<Produto> produtos = repository.findByIsActiveTrue();

    if (produtos.isEmpty()){
      throw  new NenhumProdutoEncontradoExecption("Nenhum Card de Produto Disponivel!");
    }
    int totalItens = produtos.stream()
            .filter(p -> Boolean.TRUE.equals(p.getIsActive()))
            .mapToInt(Produto::getQuantidade)
            .sum();

    long baixoEstoque = produtos.stream()
            .filter(p -> p.getQuantidade() < 15
                    && Boolean.TRUE.equals(p.getIsActive()))
            .count();
    int produtosTotal = produtos.size();

    return new DtoResponseCard(
        totalItens,
        baixoEstoque,
        produtosTotal);
  }

}
