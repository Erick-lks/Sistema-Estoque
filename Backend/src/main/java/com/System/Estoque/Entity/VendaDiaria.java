package com.System.Estoque.Entity;



import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="tb_VendasDiaria")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VendaDiaria {

     @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDate data;

    private BigDecimal valorTotalDiario;

    @OneToMany(mappedBy = "vendaDiaria", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Venda> vendasList = new ArrayList<>();
}
