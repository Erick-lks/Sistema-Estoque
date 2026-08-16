package com.System.Estoque.Services;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class QuoteService {

    private final Random random = new Random();

    private final List<Map<String, String>> frases = List.of(
            Map.of(
                    "q", "O único modo de fazer um excelente trabalho é amar o que você faz.",
                    "a", "Steve Jobs"),
            Map.of(
                    "q", "Grandes coisas nos negócios nunca são feitas por uma pessoa. São feitas por uma equipe.",
                    "a", "Steve Jobs"),
            Map.of(
                    "q",
                    "Quando algo é importante o suficiente, você faz mesmo que as chances não estejam a seu favor.",
                    "a", "Elon Musk"),
            Map.of(
                    "q", "Se você não consegue alimentar uma equipe com duas pizzas, ela é grande demais.",
                    "a", "Jeff Bezos"),
            Map.of(
                    "q", "Sua marca é o que as pessoas dizem sobre você quando você não está na sala.",
                    "a", "Jeff Bezos"),
            Map.of(
                    "q", "É bom celebrar o sucesso, mas é mais importante aprender com o fracasso.",
                    "a", "Bill Gates"),
            Map.of(
                    "q",
                    "Se você não construir seu sonho, alguém vai contratar você para ajudá-lo a construir o sonho dele.",
                    "a", "Tony Robbins"),
            Map.of(
                    "q", "Definir metas é o primeiro passo para transformar o invisível em visível.",
                    "a", "Tony Robbins"),
            Map.of(
                    "q", "O preço é o que você paga. O valor é o que você recebe.",
                    "a", "Warren Buffett"),
            Map.of(
                    "q", "Regra número um: nunca perca dinheiro. Regra número dois: nunca esqueça a regra número um.",
                    "a", "Warren Buffett"),
            Map.of(
                    "q", "A oportunidade não bate à porta. Ela aparece quando você constrói algo.",
                    "a", "Empreendedorismo"),
            Map.of(
                    "q", "O sucesso normalmente vem para aqueles que estão ocupados demais para procurá-lo.",
                    "a", "Henry David Thoreau"));

    public Object getRandomQuote() {
        return frases.get(random.nextInt(frases.size()));
    }
}