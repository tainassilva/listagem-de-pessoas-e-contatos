package br.com.taina.service;

import br.com.taina.model.Contato;
import br.com.taina.validation.ContatoValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.taina.exception.ErroServidorException;
import br.com.taina.exception.IdNotFoundException;
import br.com.taina.exception.NadaParaListarException;
import br.com.taina.exception.CampoNotNullException;
import br.com.taina.model.Pessoa;
import br.com.taina.repository.PessoaRepository;
import br.com.taina.validation.PessoaValidation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    PessoaValidation pessoaValidation;

    @Autowired
    ContatoValidation contatoValidation;

    @Transactional
    public Pessoa save(Pessoa pessoa) {
        // Valida os dados da pessoa
        pessoaValidation.validarPessoa(pessoa);

        // Valida os contatos (caso haja alguma validação específica para contatos)
        if (pessoa.getContatos() != null) {
            pessoa.getContatos().forEach(contato -> {
                contatoValidation.validarContato(contato);
                // Se o contato for novo, garante que seja salvo antes de salvar a pessoa
                if (contato.getId() == null) {
                    // Salvar o contato explicitamente, se necessário
                }
            });
        }

        try {
            // Salva a pessoa e seus contatos devido ao CascadeType.ALL
            return pessoaRepository.save(pessoa);
        } catch (ErroServidorException e) {
            throw new ErroServidorException("Erro ao salvar a pessoa e seus contatos: " + e.getMessage());
        }
    }

    @Transactional
    public List<Pessoa> findAll() {
        try {
            List<Pessoa> pessoas = pessoaRepository.findAll();

            if (pessoas.isEmpty()) {
                throw new NadaParaListarException("Nenhuma pessoa encontrada para listar.");
            }
            return pessoas;
        } catch (ErroServidorException e) {
            throw new ErroServidorException(e.getMessage());
        }
    }

    @Transactional
    public Pessoa findById(Long id) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        try {
            return pessoaRepository.findById(id)
                    .orElseThrow(() -> new IdNotFoundException("Pessoa com ID " + id + " não encontrada"));
        } catch (ErroServidorException e) {
            throw new ErroServidorException(e.getMessage());
        }
    }

    @Transactional
    public Pessoa update(Long id, Pessoa pessoa) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        // Encontra a pessoa existente no banco
        Pessoa pessoaExistente = pessoaRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Pessoa com ID " + id + " não encontrada para atualização!"));

        // Valida os dados da pessoa
        pessoaValidation.validarPessoa(pessoa);

        // Atualizando os dados principais da pessoa
        pessoaExistente.setNome(pessoa.getNome());
        pessoaExistente.setEndereco(pessoa.getEndereco());
        pessoaExistente.setNumeroCasa(pessoa.getNumeroCasa());
        pessoaExistente.setCep(pessoa.getCep());
        pessoaExistente.setCidade(pessoa.getCidade());
        pessoaExistente.setUf(pessoa.getUf());

        // Atualizando os contatos, se houver
        if (pessoa.getContatos() != null && !pessoa.getContatos().isEmpty()) {
            // Iterar sobre os contatos enviados no request
            for (Contato contato : pessoa.getContatos()) {
                if (contato.getId() != null) {
                    // Se o contato já tem um ID, buscamos o contato no banco para atualização
                    Contato contatoExistente = pessoaExistente.getContatos().stream()
                            .filter(c -> c.getId().equals(contato.getId()))
                            .findFirst()
                            .orElseThrow(() -> new IdNotFoundException("Contato com ID " + contato.getId() + " não encontrado"));

                    // Atualiza os campos do contato
                    contatoExistente.setTipoContato(contato.getTipoContato());
                    contatoExistente.setContato(contato.getContato());
                } else {
                    // Caso o contato não tenha ID, ele é tratado como novo
                    contato.setPessoa(pessoaExistente);  // Associando o contato à pessoa
                    pessoaExistente.getContatos().add(contato);
                }
            }
        }

        try {
            // Salva a pessoa e seus contatos atualizados
            return pessoaRepository.save(pessoaExistente);
        } catch (Exception e) {
            throw new ErroServidorException("Erro ao atualizar a pessoa: " + e.getMessage());
        }
    }


    @Transactional
    public void delete(Long id) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Pessoa com ID " + id + " não encontrada para exclusão"));

        try {
            pessoaRepository.delete(pessoa);
        } catch (Exception e) {
            throw new ErroServidorException("Erro ao excluir a pessoa: " + e.getMessage());
        }
    }
}
