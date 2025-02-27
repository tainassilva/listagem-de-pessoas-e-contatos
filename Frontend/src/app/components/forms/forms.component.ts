import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViaCepService } from 'src/app/services/via-cep.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
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

  @Input() formGroupPessoa!: FormGroup;
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isLoading = false;

  viaCepService = inject(ViaCepService);
  router = inject(Router);


  handleBuscarEnderecoPorCep() {
    const cep = this.formGroupPessoa.get('cep')?.value;
    const cepRegex = /^\d{5}-?\d{3}$/;

    if (cep && cepRegex.test(cep)) {
      this.viaCepService.buscarEnderecoPorCep(cep.replace('-', '')).subscribe({
        next: (endereco) => {
          if (endereco && !endereco.erro) {
            this.formGroupPessoa.patchValue({
              endereco: endereco.logradouro,
              cidade: endereco.localidade,
              uf: endereco.uf
            });
          } else {
            Swal.fire('Erro', 'CEP não encontrado!', 'error');
          }
        },
        error: (error) => {
          console.error('Erro ao buscar CEP:', error);
          Swal.fire('Erro', 'Não foi possível buscar o CEP.', 'error');
        }
      });
    } else if (cep) {
      Swal.fire('Erro', 'Formato de CEP inválido', 'error');
    }
  }

  submitForm() {
    if (this.formGroupPessoa.valid) {
      this.onSubmit.emit();
    } else {
      Swal.fire('Formulário inválido!', 'Por favor, preencha os campos corretamente.', 'error');
    }
  }

  voltar(): void {
    this.router.navigate(['/pessoas']);
  }
}
