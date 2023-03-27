package br.com.api.contatos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.contatos.modelo.ContatosModelo;
import br.com.api.contatos.modelo.RespostaModelo;
import br.com.api.contatos.repositorio.ContatosRepositorio;

@Service
public class ContatosServico {
    
    @Autowired
    private ContatosRepositorio cr;


    @Autowired
    private RespostaModelo rm;


    //Método para lista todos os produtos
    public Iterable<ContatosModelo> listar(){
        return cr.findAll();
    }

    //Método para cadastrar ou alterar produtos
    public ResponseEntity<?> cadastrarAlterar(ContatosModelo cm, String acao){

        if(cm.getNome().equals("")){
            rm.setMensagem("O nome do contato é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if(cm.getTelefone().equals("")){
            rm.setMensagem("O telefone pra contato é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else {
            if(acao.equals("cadastrar")){
                return new ResponseEntity<ContatosModelo>(cr.save(cm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<ContatosModelo>(cr.save(cm), HttpStatus.OK);
            }
        }
    }

    //Método para remover produtos
    public ResponseEntity<RespostaModelo> remover(Integer id){

        cr.deleteById(id);

        rm.setMensagem("O contato foi excluído!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
