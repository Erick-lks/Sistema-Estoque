package com.System.Estoque.Repository;


import com.System.Estoque.Entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RepositoryVenda extends JpaRepository<Venda, Long> {

    List<Venda> findByVendaDiariaIsNull();



}
