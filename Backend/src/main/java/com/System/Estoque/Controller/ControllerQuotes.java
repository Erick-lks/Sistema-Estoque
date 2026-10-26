package com.System.Estoque.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.System.Estoque.Service.QuoteService;

@RestController
@RequestMapping("/Api")
@CrossOrigin(origins = "sistema-estoque-seven.vercel.app")
@PreAuthorize("hasAnyRole('ADMIN', 'GERENTE')")

public class ControllerQuotes {

    private final QuoteService service;

    public ControllerQuotes(QuoteService service) {
        this.service = service;
    }

    @GetMapping("/Mensagem")
    public Object mensagemObject() {
        return service.getRandomQuote();
    }

}
