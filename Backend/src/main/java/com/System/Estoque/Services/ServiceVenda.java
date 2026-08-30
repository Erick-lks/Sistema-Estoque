package com.System.Estoque.Services;


import com.System.Estoque.Entity.Venda;
import com.System.Estoque.Repository.RepositoryVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceVenda {

    @Autowired
    private RepositoryVenda repositoryVenda;


    public ResponseEntity<List<Venda>> listartodas () {
        List<Venda> listadeVenda = repositoryVenda.findAll();

        if(listadeVenda.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(listadeVenda);
    }


    public ResponseEntity<?> cadastrarVenda (Venda venda){
        repositoryVenda.save(venda);
        return  ResponseEntity.status(HttpStatus.CREATED).body("Venda Cadastrada com Sucesso! ");
    }
}
