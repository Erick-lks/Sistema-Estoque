package com.System.Estoque.Controller;




import com.System.Estoque.Dto.Request.DtoRequestVenda;
import com.System.Estoque.Dto.Response.DtoResponseVendaDiaria;
import com.System.Estoque.Dto.Response.DtoResponseVenda;
import com.System.Estoque.Service.VendaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/Vendas")
@PreAuthorize("isAuthenticated()")
public class ControllerVenda {

    @Autowired
    private VendaService vendaService;

    @GetMapping("/Listar")
    public ResponseEntity<?> listarVenda(){

        return vendaService.listartodas();
    }

    @PostMapping("/Cadastrar")
    public ResponseEntity<DtoResponseVenda> cadastroVenda(
            @RequestBody DtoRequestVenda dto) {


        return vendaService.cadastrarVenda(dto);
    }


    @GetMapping("/ListarVendasDiaria")
    public ResponseEntity<List<DtoResponseVendaDiaria>> vendasDoDia() {
        return vendaService.listarTodasVendasPorDia();
    }


    @PostMapping("/CadastrarVendaDiaria")
    public ResponseEntity<DtoResponseVendaDiaria> cadastroVendaDiaria() {
        return vendaService.fechoDoDia();
    }

}
