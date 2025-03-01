package br.com.taina.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.taina.exception.ErroServidorException;
import br.com.taina.exception.IdNotFoundException;
import br.com.taina.exception.NadaParaListarException;
import br.com.taina.exception.CampoNotNullException;
import br.com.taina.model.Contato;
import br.com.taina.model.Pessoa;
import br.com.taina.repository.ContatoRepository;
import br.com.taina.repository.PessoaRepository;
import br.com.taina.validation.ContatoValidation;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ContatoValidation contatoValidation;

    @Transactional
    public Contato save(Contato contato) {
        if (contato.getPessoa() == null || contato.getPessoa().getId() == null) {
            throw new CampoNotNullException("Erro! A pessoa e seu ID não podem ser nulos.");
        }

        Pessoa pessoa = pessoaRepository.findById(contato.getPessoa().getId())
                .orElseThrow(() -> new IdNotFoundException("Pessoa com ID " + contato.getPessoa().getId() + " não encontrada"));

        contatoValidation.validarContato(contato);
        contato.setPessoa(pessoa);
        pessoa.getContatos().add(contato);

        try {
            return contatoRepository.save(contato);
        } catch (Exception e) {
            throw new ErroServidorException(e.getMessage());
        }
    }

    public Contato findById(Long id) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }
        return contatoRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Contato com ID " + id + " não encontrado"));
    }

    public List<Contato> findAllByPessoaId(Long idPessoa) {
        if (idPessoa == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        pessoaRepository.findById(idPessoa)
                .orElseThrow(() -> new IdNotFoundException("Pessoa com ID " + idPessoa + " não encontrada"));

        List<Contato> contatos = contatoRepository.findContatosPessoaById(idPessoa);

        if (contatos.isEmpty()) {
            throw new NadaParaListarException("Nenhum contato encontrado para a pessoa com ID " + idPessoa);
        }

        return contatos;
    }

    @Transactional
    public Contato update(Long id, Contato contato) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        Contato contatoAtualizado = contatoRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Contato com ID " + id + " não encontrado"));

        contatoValidation.validarContato(contato);

        contatoAtualizado.setTipoContato(contato.getTipoContato());
        contatoAtualizado.setContato(contato.getContato());

        try {
            return contatoRepository.save(contatoAtualizado);
        } catch (Exception e) {
            throw new ErroServidorException(e.getMessage());
        }
    }

    @Transactional
    public void delete(Long id) {
        if (id == null) {
            throw new CampoNotNullException("Erro! Campo ID não pode ser nulo.");
        }

        Contato contato = contatoRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Contato com ID " + id + " não encontrado para exclusão."));

        try {
            contatoRepository.delete(contato);
        } catch (Exception e) {
            throw new ErroServidorException(e.getMessage());
        }
    }
}
