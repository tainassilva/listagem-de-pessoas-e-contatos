package br.com.taina.model;

import br.com.taina.enums.Estados;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import java.util.List;

/**
 * Representa uma pessoa mapeada para uma tabela no banco de dados. Contém informações pessoais, como nome, endereço, 
 * cidade, estado e contatos associados à pessoa. A relação entre pessoa e contatos é um relacionamento um-para-muitos
 * ou seja, uma pessoa pode ter múltiplos contatos.
 *
 * <p>A pessoa pode ter uma lista de contatos associados, que são armazenados na tabela relacionada. Cada contato pode 
 * ter um tipo específico ( telefone fixo ,celular, e-mail e linkedIn), conforme definido no {@link TipoContato}.</p>
 */
@Entity
@Schema(hidden = true)  // Oculta a classe do Swagger
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(hidden = true)  // Esconde o id no Swagger
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Nome da pessoa.", example = "Taina")
    private String nome;

    @Schema(description = "Endereço da pessoa.", example = "Rua Penha")
    private String endereco;

    @Schema(description = "Numero da casa da pessoa. Exemplo de formato: 135A ou 135", example = "135A")
    private String numeroCasa;

    @Schema(description = "Cep da pessoa. Exemplo de formato: XXXXX-XXX ou XXXXXXXX", example = "06700000")
    private String cep;

    @Schema(description = "Cidade da pessoa", example = "Cotia")
    private String cidade;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Estado da pessoa (UF)", example = "SP")
    private Estados uf;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pessoa", targetEntity = Contato.class)
    @JsonManagedReference
    private List<Contato> contatos;

    public Pessoa() {}

    public Pessoa(Long id, String nome, String numeroCasa, String endereco, String cep, String cidade, Estados uf, List<Contato> contatos) {
        this.id = id;
        this.nome = nome;
        this.numeroCasa = numeroCasa;
        this.endereco = endereco;
        this.cep = cep;
        this.cidade = cidade;
        this.uf = uf;
        this.contatos = contatos;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNumeroCasa() {
        return numeroCasa;
    }

    public void setNumeroCasa(String numeroCasa) {
        this.numeroCasa = numeroCasa;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Estados getUf() {
        return uf;
    }

    public void setUf(Estados uf) {
        this.uf = uf;
    }

    public List<Contato> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
    }

    @Override
    public String toString() {
        return "Pessoa{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", endereco='" + endereco + '\'' +
                ", numeroCasa='" + numeroCasa + '\'' +
                ", cep='" + cep + '\'' +
                ", cidade='" + cidade + '\'' +
                ", uf=" + uf +
                ", contatos=" + contatos +
                '}';
    }
}
