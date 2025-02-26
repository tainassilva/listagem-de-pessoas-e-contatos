import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import Swal from 'sweetalert2';
import { ViaCepService } from 'src/app/services/via-cep.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss'],
})
export class AddPessoaComponent implements OnInit {
  id: number | null = null;
  formGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
    contatos: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,11}')]),
  });

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
    private readonly route: ActivatedRoute,
    private readonly pessoasService: PessoasService,
    private readonly cepService: ViaCepService,  // Injete o serviço aqui
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.carregarPessoa(this.id);
    }
  }

  carregarPessoa(id: number): void {
    this.pessoasService.buscarPessoaPorId(id).subscribe((pessoa: IPessoa) => {
      this.formGroupPessoa.patchValue({
        ...pessoa,
        contatos: pessoa.contatos.length ? pessoa.contatos[0] : '', // Ajuste para exibir o primeiro contato
      });
    });
  }

  salvarPessoa(): void {
    if (this.formGroupPessoa.invalid) {
      return;
    }

    const pessoa: IPessoa = {
      ...this.formGroupPessoa.value,
      contatos: [this.formGroupPessoa.value.contatos], // Converte para array
    };

    if (this.id) {
      this.pessoasService.atualizarPessoa(this.id, pessoa).subscribe(() => {
        Swal.fire('Sucesso', 'Pessoa editada com sucesso!', 'success');
        this.router.navigate(['/pessoas']);
      });
    } else {
      this.pessoasService.cadastrarPessoa(pessoa).subscribe(() => {
        Swal.fire('Sucesso', 'Pessoa cadastrada com sucesso!', 'success');
        this.router.navigate(['/pessoas']);
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/pessoas']);
  }

  // Função chamada ao digitar o CEP
  buscarEnderecoPorCep(): void {
    const cep = this.formGroupPessoa.value.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {  // Verifica se o CEP tem 8 dígitos
      this.cepService.buscarEnderecoPorCep(cep).subscribe((dados) => {
        if (dados && !dados.erro) {
          // Preenche os campos de endereço com os dados retornados
          this.formGroupPessoa.patchValue({
            endereco: dados.logradouro,
            cidade: dados.localidade,
            uf: dados.uf,
          });
        } else {
          alert('CEP não encontrado!');
        }
      });
    }
  }
}
