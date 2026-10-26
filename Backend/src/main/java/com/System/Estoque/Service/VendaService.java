package com.System.Estoque.Service;


import com.System.Estoque.Dto.Request.DtoRequestVenda;
import com.System.Estoque.Dto.Response.DtoResponseVendaDiaria;
import com.System.Estoque.Dto.Response.DtoResponseVenda;

import com.System.Estoque.Entity.Venda;
import com.System.Estoque.Entity.VendaDiaria;

import com.System.Estoque.Exeption.NenhumaVendaException;
import com.System.Estoque.Mapper.MapperVenda;
import com.System.Estoque.Mapper.MapperVendaDiaria;
import com.System.Estoque.Repository.RepositoryVendaDiaria;
import com.System.Estoque.Repository.RepositoryVenda;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class VendaService {


    @Autowired
    private RepositoryVenda repositoryVenda;

    @Autowired
    private RepositoryVendaDiaria repositoryDiario;
    @Autowired
    private MapperVenda mapper;
    @Autowired
    private MapperVendaDiaria mapperVendaDiaria;


    public ResponseEntity<List<Venda>> listartodas (){

      List<Venda>  listar = repositoryVenda.findAll();


        return ResponseEntity.ok(listar);

    }

    public ResponseEntity<DtoResponseVenda> cadastrarVenda (DtoRequestVenda dto){


        Venda entity = mapper.toEntity(dto);


        Venda novaVenda = repositoryVenda.save(entity);



        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toResponse(novaVenda));
    }


    public ResponseEntity<List<DtoResponseVendaDiaria>> listarTodasVendasPorDia() {

        List<VendaDiaria> vendasDiarias = repositoryDiario.findAll();

        if (vendasDiarias.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<DtoResponseVendaDiaria> response = vendasDiarias.stream()
                .map(mapperVendaDiaria::toResponse)
                .toList();

        return ResponseEntity.ok(response);
    }

   @Transactional
public ResponseEntity<DtoResponseVendaDiaria> fechoDoDia() {

    List<Venda> vendas = repositoryVenda.findByVendaDiariaIsNull();

    if (vendas.isEmpty()) {
        throw new NenhumaVendaException(
                "Não existem vendas pendentes para fechar o dia."
        );
    }

    VendaDiaria vendaDiaria = new VendaDiaria();
    BigDecimal total = BigDecimal.ZERO;

    for (Venda venda : vendas) {
        venda.setVendaDiaria(vendaDiaria);
        total = total.add(BigDecimal.valueOf(venda.getValorTotal()));
    }

    vendaDiaria.setData(LocalDate.now());
    vendaDiaria.setValorTotalDiario(total);
    vendaDiaria.setVendasList(vendas);

    VendaDiaria salva = repositoryDiario.save(vendaDiaria);

    DtoResponseVendaDiaria response = mapperVendaDiaria.toResponse(salva);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
}
