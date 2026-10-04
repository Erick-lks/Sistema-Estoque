package com.System.Estoque.Entity;


import com.System.Estoque.Entity.Enum.Perfil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="tb_Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCompleto;
    private String cpf;
    private String password;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;
}
