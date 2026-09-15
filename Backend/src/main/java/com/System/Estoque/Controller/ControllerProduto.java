package com.System.Estoque.Controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.System.Estoque.Dtos.CardResponseDto;
import com.System.Estoque.Dtos.ProdutoRequestDto;
import com.System.Estoque.Dtos.ProdutoResponseDto;
import com.System.Estoque.Services.ServicesProduto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Estoque")
@CrossOrigin(origins = "sistema-estoque-seven.vercel.app")

public class ControllerProduto {

    private final ServicesProduto services;

    ControllerProduto(ServicesProduto services) {
        this.services = services;
    }

    @GetMapping("/Listar")
    public ResponseEntity<?> listarTodos(@PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(services.listarTodos(pageable));
    }

    @GetMapping("/Listar/{id}")
    public ResponseEntity<?> listarporId(@PathVariable Long id) {
        return ResponseEntity.ok(services.listarporId(id));
    }

    @GetMapping("/Buscar")
    public ResponseEntity<?> buscarItem(@RequestParam String categoria, Pageable pageable) {
        return ResponseEntity.ok(services.buscandoItem(categoria, pageable));
    }

    @PostMapping("/Cadastrar")
    public ResponseEntity<?> adicionarProduto(@Valid @RequestBody ProdutoRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(services.cadastrarNovoProduto(dto));
    }

    @PutMapping("/Alterar/{id}")
    public ResponseEntity<?> alterarProduto(@PathVariable Long id, @RequestBody ProdutoRequestDto dto) {

        return ResponseEntity.ok(services.aletrarproduto(id, dto));

    }

    @DeleteMapping("/Remover/{id}")
    public ResponseEntity<?> removerProduto(@PathVariable Long id) {

        return ResponseEntity.ok(services.removerProduto(id));

    }

    @PatchMapping("/Restaurar/{id}")
    public ResponseEntity<?> restaurarProduto(@PathVariable Long id) {

        return ResponseEntity.ok(services.restaurarProduto(id));

    }



    public ServicesProduto getServices() {
        return services;
    }

    @GetMapping("/Total")
    public ResponseEntity<CardResponseDto> getTotalItens() {

        return ResponseEntity.ok(services.findAllItens());
    }

    @GetMapping("/Baixo-estoque")
    public ResponseEntity<Page<ProdutoResponseDto>> baixoEstoque(
            Pageable pageable) {

        return services.baixoEstoque(pageable);
    }

}
