import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss'],
})
export class AddPessoaComponent{

  formGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cep: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
    contatos: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,11}')]),
  });

  pessoasService = inject(PessoasService);
  router = inject(Router);

  salvarPessoa(): void {
    const pessoa: IPessoa = this.formGroupPessoa.value;
    pessoa.contatos = [this.formGroupPessoa.value.contatos];

    this.pessoasService.cadastrarPessoa(pessoa).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Pessoa cadastrada com sucesso!', 'success');
        this.router.navigate(['/pessoas']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar pessoa:', error);
        Swal.fire('Erro', 'Não foi possível cadastrar a pessoa.', 'error');
      },
    });
  }
}
