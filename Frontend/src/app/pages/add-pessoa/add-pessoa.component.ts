import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IContato } from 'src/app/interfaces/contato';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss'],
})
export class AddPessoaComponent {
  private fb = inject(FormBuilder);
  private pessoasService = inject(PessoasService);
  private router = inject(Router);

  formGroupPessoa: FormGroup = this.fb.group({
    nome: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ ]*')]],

    cep: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]],

    endereco: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ0-9 ]*')]],

    numeroCasa: ['', [
      Validators.required, Validators.minLength(1),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]+$')]],

    cidade: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ ]*')]],

    uf: ['', [Validators.required]],

    contatos: this.fb.array([])
  });

  get contatos(): FormArray {
    return this.formGroupPessoa.get('contatos') as FormArray;
  }

  // o Optional pode ser usado para tornar um parâmetro de uma função opcional
  createContatoFormGroup(contato: Partial<IContato> = {}): FormGroup {
    return this.fb.group({
      id: [contato.id ],
      tipoContato: [contato.tipoContato || '', Validators.required],
      contato: [contato.contato || '', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]]
    });
  }

  addContato(): void {
    this.contatos.push(this.createContatoFormGroup());
  }

  salvarPessoa(): void {
    if (this.formGroupPessoa.invalid) {
      Swal.fire('Erro', 'Por favor, preencha todos os campos corretamente.', 'error');
      return;
    }

    const pessoa: IPessoa = {
      ...this.formGroupPessoa.value,
      contatos: this.contatos.value
    };

    this.pessoasService.cadastrarPessoa(pessoa).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Pessoa cadastrada com sucesso!', 'success');
        this.router.navigate(['/pessoas']);
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível cadastrar a pessoa.', 'error');
      }
    });
  }
}
