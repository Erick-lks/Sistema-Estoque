package com.System.Estoque.Repository;


import com.System.Estoque.Entity.VendaDiaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryVendaDiaria extends JpaRepository<VendaDiaria, Long> {


}
