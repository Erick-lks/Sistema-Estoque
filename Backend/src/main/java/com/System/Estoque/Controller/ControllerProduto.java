package com.System.Estoque.Controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.System.Estoque.Dtos.CardResponseDto;
import com.System.Estoque.Dtos.ProdutoRequestDto;
import com.System.Estoque.Dtos.ProdutoResponseDto;
import com.System.Estoque.Services.ServicesProduto;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/Estoque")
@CrossOrigin(origins = "https://sistema-estoque-git-main-erickcaetano1200s-projects.vercel.app/e-git-main-erickcaetano1200s-projects.vercel.app/")



public class ControllerProduto {




    private final ServicesProduto services;


    ControllerProduto(ServicesProduto services) {
        this.services = services;
    }


@GetMapping("/listar")
public ResponseEntity<?> listarTodos( @PageableDefault(size = 10) Pageable pageable) {
    return ResponseEntity.ok(services.listarTodos(pageable));
}


@GetMapping("/listar/{id}")
public ResponseEntity<?> listarporId(@PathVariable Long id){
    return ResponseEntity.ok(services.listarporId(id));
}

@GetMapping("/buscar")
public ResponseEntity<?> buscarItem(@RequestParam String categoria, Pageable pageable) {
    return ResponseEntity.ok(services.buscandoItem(categoria, pageable));
}



@PostMapping("/cadastrar")
public ResponseEntity<?> adicionarProduto(@Valid @RequestBody ProdutoRequestDto dto) {
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(services.cadastrarNovoProduto(dto));
}


@PutMapping("/alterar/{id}")
public ResponseEntity<?> alterarProduto (@PathVariable Long id ,@RequestBody ProdutoRequestDto dto){

  return ResponseEntity.ok(services.aletrarproduto(id, dto));


}


@DeleteMapping("/remover/{id}")
public ResponseEntity<?> removerProduto (@PathVariable Long id){
 
return ResponseEntity.ok(services.removerProduto(id));


}

    public ServicesProduto getServices() {
        return services;
    }

    
    @GetMapping("/total")
    public ResponseEntity<CardResponseDto> getTotalItens() {


        return  ResponseEntity.ok(services.findAllItens());
    }

    @GetMapping("/baixo-estoque")
public ResponseEntity<Page<ProdutoResponseDto>> baixoEstoque(
        Pageable pageable) {

    return services.baixoEstoque(pageable);
}


}
