import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Importação para requisição HTTP

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss']
})
export class EditPessoaComponent implements OnInit {
  formGroupPessoa: FormGroup;
  pessoa?: IPessoa;
  id!: number;

  estados = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
  ];

  constructor(
    private fb: FormBuilder,
    private pessoasService: PessoasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient // Injeção do HttpClient
  ) {
    this.formGroupPessoa = this.fb.group({
      id: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      contato: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.pessoasService.buscarPessoaPorId(this.id).subscribe(pessoa => {
        this.pessoa = pessoa;
        this.formGroupPessoa.patchValue({
          id: pessoa.id,
          nome: pessoa.nome,
          cep: pessoa.cep,
          endereco: pessoa.endereco,
          cidade: pessoa.cidade,
          uf: pessoa.uf,
          contato: pessoa.contatos?.[0] || ''
        });
      });
    }
  }

  // Função para buscar endereço a partir do CEP
  buscarEnderecoPorCep(): void {
    const cep = this.formGroupPessoa.get('cep')?.value;
    if (cep && cep.length === 8) { // Verifica se o CEP tem 8 caracteres
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(data => {
          if (data && !data.erro) {
            this.formGroupPessoa.patchValue({
              endereco: data.logradouro,
              cidade: data.localidade,
              uf: data.uf
            });
          } else {
            Swal.fire('Erro', 'CEP não encontrado!', 'error');
          }
        }, (error) => {
          console.error('Erro ao buscar o endereço', error);
          Swal.fire('Erro', 'Falha ao buscar o endereço', 'error');
        });
    }
  }

  isEdit(): void {
    Swal.fire({
      title: "Deseja salvar as alterações?",
      text: "Você pode cancelar ou continuar sem salvar.",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: "Não salvar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        this.atualizarPessoa();
        Swal.fire({
          title: "Alterações salvas!",
          text: "As mudanças foram aplicadas com sucesso.",
          icon: "success",
        });
      }
    });
  }

  atualizarPessoa(): void {
    if (this.formGroupPessoa.invalid) {
      return;
    }

    const pessoa: IPessoa = this.formGroupPessoa.value;
    pessoa.contatos = [this.formGroupPessoa.value.contato];

    this.pessoasService.atualizarPessoa(this.id, pessoa).subscribe(() => {
      Swal.fire('Sucesso', 'Pessoa editada com sucesso!', 'success');
      this.router.navigate(['/pessoas']);
    }, (error) => {
      console.error("Erro ao atualizar pessoa", error);
    });
  }

  voltar() {
    this.location.back();
  }
}
