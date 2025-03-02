import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'; // Importe FormBuilder e Validators
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

  tiposContato = [
    { value: 'TELEFONE_FIXO', label: 'Telefone Fixo' },
    { value: 'CELULAR', label: 'Celular' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'LINKEDIN', label: 'LinkedIn' }
  ];

  @Input() formGroupPessoa!: FormGroup;
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  viaCepService = inject(ViaCepService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);


  handleBuscarEnderecoPorCep() {
    const cepControl = this.formGroupPessoa.get('cep');
    if (cepControl?.value) {
      const cep = cepControl.value.replace('-', '');
      this.viaCepService.buscarEnderecoPorCep(cep).subscribe({
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
          Swal.fire('Erro', 'Não foi possível buscar o CEP.', 'error');
        }
      });
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


  get contatos(): FormArray {
    return this.formGroupPessoa.get('contatos') as FormArray;
  }

  addContato() {
    this.contatos.push(this.formBuilder.group({
      tipoContato: ['', Validators.required],
      contato: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]]
    }));
  }

  deletarContato(index: number) {
    this.contatos.removeAt(index);
  }

}
