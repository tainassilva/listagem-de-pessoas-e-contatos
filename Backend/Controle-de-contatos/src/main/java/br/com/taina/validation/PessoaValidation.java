package br.com.taina.validation;

import org.springframework.stereotype.Component;
import br.com.taina.model.Pessoa;
import br.com.taina.exception.CampoVazioException;
import br.com.taina.exception.FormatoInvalidoException;
import br.com.taina.exception.CampoNotNullException;

import java.util.regex.Pattern;

@Component
public class PessoaValidation {

    private static final String regexLetrasEspacos = "^[A-Za-záàãâéèêíóôúçÁÀÂÉÊÍÓÔÚÇ\\s]+$";
    private static final String regexCep = "^[0-9]{5}-?[0-9]{3}$";

    private boolean isNomeInvalido(String nome) {
        return !Pattern.matches(regexLetrasEspacos, nome);
    }

    private boolean isNomeVazio(String nome) {
        return nome.trim().isEmpty();
    }

    private boolean isNomeNulo(String nome) {
        return nome == null;
    }

    private boolean isCepInvalido(String cep) {
        return cep != null && !Pattern.matches(regexCep, cep);
    }

    private boolean isCidadeInValida(String cidade) {
        return cidade != null && !Pattern.matches(regexLetrasEspacos, cidade);
    }

    public void validarPessoa(Pessoa pessoa) {

        if (isNomeNulo(pessoa.getNome())) {
            throw new CampoNotNullException("Campo nulo não permitido! Insira um nome.");
        }

        if (isNomeVazio(pessoa.getNome())) {
            throw new CampoVazioException("Campo vazio não permitido! Insira um nome.");
        }
        if (isNomeInvalido(pessoa.getNome())) {
            throw new FormatoInvalidoException("Nome inválido! Deve conter apenas letras.");
        }

        if (isCidadeInValida(pessoa.getCidade())) {
            throw new FormatoInvalidoException("Cidade inválida! Deve conter apenas letras.");
        }

        if (isCepInvalido(pessoa.getCep())) {
            throw new FormatoInvalidoException("CEP inválido! O formato correto é XXXXXXXX ou XXXXX-XXX.");
        }
    }
}
