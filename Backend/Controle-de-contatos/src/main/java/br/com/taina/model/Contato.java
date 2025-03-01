package br.com.taina.model;

import br.com.taina.enums.TipoContato;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

/**
 * Representa um contato de uma pessoa mapeada para uma tabela no banco de dados
 * e contém informações sobre o tipo e o valor do contato, além de uma referência à pessoa associada. Também temos a relação
 * de muitos para um, que recebe uma chave estrangeira da entidade Pessoa. Podemos dizer assim:
 * <b>Vários contatos relacionados a uma pessoa.</b>
 *
 * <p>O contato pode ser de diferentes tipos, como telefone fixo, celular, e-mail e LinkedIn definidos no {@link TipoContato}.
 * Esta classe é usada para armazenar e manipular as informações relacionadas ao contato de uma pessoa.</p>
 */
@Entity
@Schema(hidden = true)
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(hidden = true)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "Tipo de contato. Exemplos: telefone fixo, celular, e-mail, LinkedIn.", example = "CELULAR")
    private TipoContato tipoContato;

    @Column(nullable = false)
    @Schema(description = "Valor do contato. Exemplo: (11) 98765-4321", example = "11987654321")
    private String contato;

    @ManyToOne
    @JoinColumn(name = "id_pessoa")
    @JsonBackReference
    @Schema(description = "Pessoa associada ao contato.")
    private Pessoa pessoa;

    public Contato() {}

    public Contato(Long id, TipoContato tipoContato, String contato, Pessoa pessoa) {
        this.id = id;
        this.tipoContato = tipoContato;
        this.contato = contato;
        this.pessoa = pessoa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public TipoContato getTipoContato() {
        return tipoContato;
    }

    public void setTipoContato(TipoContato tipoContato) {
        this.tipoContato = tipoContato;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    @Override
    public String toString() {
        return "Contato [id=" + id + ", tipoContato=" + tipoContato + ", contato=" + contato + ", pessoa=" + pessoa + "]";
    }
}
