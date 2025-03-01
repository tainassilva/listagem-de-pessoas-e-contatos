package br.com.taina.validation;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import br.com.taina.enums.TipoContato;
import br.com.taina.exception.CampoVazioException;
import br.com.taina.exception.FormatoInvalidoException;
import br.com.taina.exception.CampoNotNullException;
import br.com.taina.model.Contato;

@Component
public class ContatoValidation {

    private static final String REGEX_CELULAR_TELEFONE = "^\\d{10,11}$";
    private static final String REGEX_EMAIL = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private static final String REGEX_LINKEDIN = "^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/in\\/([a-zA-Z0-9-]+)$";

    public void validarContato(Contato contato) {
        if (contato.getTipoContato() == null) {
            throw new CampoNotNullException("Erro! O tipo de contato não pode ser nulo. Insira um tipo válido: TELEFONE_FIXO, CELULAR, EMAIL, LINKEDIN.");
        }

        if (contato.getContato() == null) {
            throw new CampoNotNullException("Erro! O contato não pode ser nulo. Insira um contato válido.");
        }

        if (contato.getContato().trim().isEmpty()) {
            throw new CampoVazioException("Erro! O contato não pode estar vazio. Insira um valor válido.");
        }

        switch (contato.getTipoContato()) {
            case CELULAR:
            case TELEFONE_FIXO:
                if (!Pattern.matches(REGEX_CELULAR_TELEFONE, contato.getContato())) {
                    throw new FormatoInvalidoException("Erro! Formato inválido. Insira um telefone válido, incluindo o DDD.");
                }
                break;

            case EMAIL:
                if (!Pattern.matches(REGEX_EMAIL, contato.getContato())) {
                    throw new FormatoInvalidoException("Erro! Formato inválido. Insira um e-mail válido! Exemplo: teste@email.com");
                }
                break;

            case LINKEDIN:
                if (!Pattern.matches(REGEX_LINKEDIN, contato.getContato())) {
                    throw new FormatoInvalidoException("Erro! O formato do LinkedIn está inválido. Use um formato correto, como: www.linkedin.com/in/usuario-linkedin");
                }
                break;
        }
    }
}
