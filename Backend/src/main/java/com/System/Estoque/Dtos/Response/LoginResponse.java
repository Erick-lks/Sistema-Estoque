package com.System.Estoque.Dtos.Response;


public record LoginResponse(
        String token,
        String nomeCompleto,
        String perfil
) {
}
