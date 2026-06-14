package com.System.Estoque.Services;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class QuoteService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final Random random = new Random();

    public Object getRandomQuote() {

        String url = "https://zenquotes.io/api/quotes";

        List<String> autoresBusiness = List.of(
            "Steve Jobs",
            "Elon Musk",
            "Jeff Bezos",
            "Bill Gates",
            "Warren Buffett",
            "Tony Robbins"
        );

        List<?> response = restTemplate.getForObject(url, List.class);

        if (response == null || response.isEmpty()) {
            return null;
        }

        List<?> filtradas = response.stream()
            .filter(item -> {
                Map<?, ?> quote = (Map<?, ?>) item;
                return autoresBusiness.contains(quote.get("a"));
            })
            .collect(Collectors.toList());

        if (filtradas.isEmpty()) {
            return null;
        }

        return filtradas.get(random.nextInt(filtradas.size()));
    }
}