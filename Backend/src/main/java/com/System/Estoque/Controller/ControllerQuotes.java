package com.System.Estoque.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.System.Estoque.Services.QuoteService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173/")
public class ControllerQuotes {

    private final QuoteService service;

    public ControllerQuotes(QuoteService service) {
        this.service = service;
    }

    @GetMapping("/mensagem")
    public Object mensagemObject() {
        return service.getRandomQuote();
    }

}
