package com.System.Estoque.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.System.Estoque.Entity.Produto;

public interface RepositoryProduto extends JpaRepository<Produto, Long>{
    Page<Produto> findByCategoriaContainingIgnoreCase(
        String categoria,
        Pageable pageable
);
Page<Produto> findByQuantidadeLessThan(Integer quantidade, Pageable pageable);


    

    Page<Produto> findByQuantidadeLessThanEqual(
        Integer quantidade,
        Pageable pageable
    );

}
