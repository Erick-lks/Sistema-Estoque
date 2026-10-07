package com.System.Estoque.Config;

import com.System.Estoque.Entity.Enum.Perfil;
import com.System.Estoque.Entity.User;
import com.System.Estoque.Repository.RepositoryUser;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;



@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner criarUsuarioPadrao(
            RepositoryUser repositoryUser,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String cpfPadrao = "0123456789";
            String senhaPadrao = "estoqueTest";

            if (!repositoryUser.existsByCpf(cpfPadrao)) {

                User usuario = new User();

                usuario.setNomeCompleto("Administrador");
                usuario.setCpf(cpfPadrao);

                usuario.setPassword(
                        passwordEncoder.encode(senhaPadrao)
                );

                usuario.setPerfil(Perfil.ADMIN);

                repositoryUser.save(usuario);

                System.out.println(
                        "Usuário padrão criado com sucesso!"
                );
            }
        };
    }
}