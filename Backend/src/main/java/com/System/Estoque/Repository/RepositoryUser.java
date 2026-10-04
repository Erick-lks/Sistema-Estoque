package com.System.Estoque.Repository;

import com.System.Estoque.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RepositoryUser extends JpaRepository<User,Long> {

    Boolean existsByCpf (String cpf);
    Optional<User> findByCpf(String cpf);
}
