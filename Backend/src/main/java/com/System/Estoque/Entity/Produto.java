package com.System.Estoque.Entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "tb_Produto")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Produto {


    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

   
    @Column(name = "Produto")
        private String produto;

    @Column(name = "Categoria")
    private String categoria;
     
    @Column(name = "Quantidade")
    private Integer quantidade;

    @Column(name = "Ativo")
    private Boolean isAtivo = true;

    @Column(name = "Reativado")
    private LocalDate dataReativado;

    private LocalDate dataDeInativacao;
    
}
