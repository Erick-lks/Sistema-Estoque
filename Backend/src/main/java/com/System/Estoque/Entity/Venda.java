package com.System.Estoque.Entity;


import com.System.Estoque.Entity.Enum.Plataforma;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_Venda")
@Getter
@Setter
@AllArgsConstructor
public class Venda {



    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Enumerated(EnumType.STRING)
    private Plataforma plataforma;

    private BigDecimal quantidade;
    private int valorTotal;


    @ManyToOne
    @JsonBackReference
    private VendaDiaria vendaDiaria;

    public Venda (){

    }

}
