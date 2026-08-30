package com.System.Estoque.Controller;

import java.util.List;

import com.System.Estoque.Services.ServiceVenda;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.System.Estoque.Entity.Venda;
import com.System.Estoque.Repository.RepositoryVenda;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/Vendas")
public class ControllerVendas {

    @Autowired
    private ServiceVenda service;

    public ControllerVendas(ServiceVenda service) {
        this.service = service;
    }

    @GetMapping("/ListarVendas")
    public ResponseEntity<List<Venda>> listartodas() {
        return service.listartodas();
    }

    @PostMapping("/Cadastrar")
    public ResponseEntity<?> cadastrarVenda(@RequestBody Venda venda) {

        return service.cadastrarVenda(venda) ;

    }

}
