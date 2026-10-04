package com.System.Estoque.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.System.Estoque.Services.QuoteService;

@RestController
@RequestMapping("/Api")
@CrossOrigin(origins = "sistema-estoque-seven.vercel.app")
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
