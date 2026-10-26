package com.System.Estoque.Controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.System.Estoque.Dto.Response.DtoResponseCard;
import com.System.Estoque.Dto.Request.DtoRequestProduto;
import com.System.Estoque.Dto.Response.DtoResponseProduto;
import com.System.Estoque.Service.ProdutoServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/Estoque")
@CrossOrigin(origins = "sistema-estoque-seven.vercel.app")
@PreAuthorize("hasAnyRole('ADMIN', 'GERENTE')")


public class ControllerProduto {

    private final ProdutoServices services;

    ControllerProduto(ProdutoServices services) {
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
    public ResponseEntity<?> adicionarProduto(@Valid @RequestBody DtoRequestProduto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(services.cadastrarNovoProduto(dto));
    }

    @PutMapping("/Alterar/{id}")
    public ResponseEntity<?> alterarProduto(@PathVariable Long id, @RequestBody DtoRequestProduto dto) {

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



    public ProdutoServices getServices() {
        return services;
    }

    @GetMapping("/Total")
    public ResponseEntity<DtoResponseCard> getTotalItens() {

        return ResponseEntity.ok(services.findAllItens());
    }

    @GetMapping("/Baixo-estoque")
    public ResponseEntity<Page<DtoResponseProduto>> baixoEstoque(
            Pageable pageable) {

        return services.baixoEstoque(pageable);
    }

}
