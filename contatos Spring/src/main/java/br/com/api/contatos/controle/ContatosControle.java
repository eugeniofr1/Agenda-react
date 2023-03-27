package br.com.api.contatos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.contatos.modelo.ContatosModelo;
import br.com.api.contatos.modelo.RespostaModelo;
import br.com.api.contatos.servico.ContatosServico;

@CrossOrigin(origins = "*")
@RestController
public class ContatosControle {
    
    @Autowired
    private ContatosServico cs;

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable Integer id){
        return cs.remover(id);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ContatosModelo cm){
        return cs.cadastrarAlterar(cm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ContatosModelo cm){
        return cs.cadastrarAlterar(cm, "cadastrar");
    }


    @GetMapping("/listar")
    public Iterable<ContatosModelo> listar(){
        return cs.listar();
    }


    @GetMapping("/")
    public String rota(){
        return "Api de contatos";
    }
}
