package br.com.taina.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.taina.model.Pessoa;
import br.com.taina.service.PessoaService;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    @Operation(summary = "Cadastro de uma nova pessoa.")
    public ResponseEntity<Pessoa> save(@RequestBody Pessoa pessoa) {
        // Chama o serviço para salvar a pessoa e seus contatos
        Pessoa pessoaCadastrada = pessoaService.save(pessoa);
        return ResponseEntity.status(201).body(pessoaCadastrada);
    }

    @GetMapping
    @Operation(summary = "Lista todas as pessoas cadastradas")
    public ResponseEntity<List<Pessoa>> findAll() {
        List<Pessoa> pessoas = pessoaService.findAll();
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulta uma pessoa pelo ID")
    public ResponseEntity<Pessoa> findById(@PathVariable Long id) {
        Pessoa pessoa = pessoaService.findById(id);
        return ResponseEntity.ok(pessoa);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza as informações de uma pessoa")
    public ResponseEntity<Pessoa> update(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        // Atualiza a pessoa e seus contatos
        Pessoa pessoaAtualizada = pessoaService.update(id, pessoa);
        return ResponseEntity.ok(pessoaAtualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma pessoa pelo ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pessoaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
