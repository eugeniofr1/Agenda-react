package br.com.api.contatos.repositorio;

import org.springframework.data.repository.CrudRepository;


import br.com.api.contatos.modelo.ContatosModelo;

public interface ContatosRepositorio extends CrudRepository<ContatosModelo, Integer>{
    
}
