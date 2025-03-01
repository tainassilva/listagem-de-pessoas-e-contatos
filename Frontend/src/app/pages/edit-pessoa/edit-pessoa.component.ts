import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { IContato } from 'src/app/interfaces/contato';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss']
})
export class EditPessoaComponent implements OnInit {
  pessoa: IPessoa = {} as IPessoa;
  id: number = 0;


  pessoasService = inject(PessoasService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  formGroupPessoa: FormGroup = this.formBuilder.group({
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

    contatos: this.formBuilder.array([])

  });


  createContatoFormGroup(contato: IContato = {} as IContato): FormGroup {
    return this.formBuilder.group({
      id: [contato.id],
      tipoContato: [contato.tipoContato || '', Validators.required],
      contato: [contato.contato || '', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]]
    });
  }

  get contatos(): FormArray {
    return this.formGroupPessoa.get('contatos') as FormArray;
  }

  setContatos(contatos: IContato[]): void {
    contatos.forEach(contato => {
      this.contatos.push(this.createContatoFormGroup(contato));
    });
  }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.pessoasService.buscarPessoaPorId(this.id).subscribe({
        next: (pessoa) => {
          this.pessoa = pessoa;
          this.formGroupPessoa.patchValue({
            nome: pessoa.nome,
            cep: pessoa.cep,
            endereco: pessoa.endereco,
            cidade: pessoa.cidade,
            uf: pessoa.uf,
            numeroCasa: pessoa.numeroCasa
          });
          this.setContatos(pessoa.contatos);
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao buscar pessoa!', 'error');
          this.router.navigate(['/pessoas']);
        }
      });
    }
  }


  atualizarPessoa(): void {
    if (this.formGroupPessoa.valid) {
      const pessoaAtualizada: IPessoa = {
        id: this.id,
        ...this.formGroupPessoa.value,
        contatos: [
          {
            id: this.pessoa.contatos[0]?.id || null,
            tipoContato: this.contatos.controls[0]?.get('tipoContato')?.value || '',
            contato: this.contatos.controls[0]?.get('contato')?.value || ''
          }
        ]
      };

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
          this.pessoasService.atualizarPessoa(this.id, pessoaAtualizada).subscribe({
            next: () => {
              Swal.fire('Sucesso', 'Pessoa editada com sucesso!', 'success');
              this.router.navigate(['/pessoas']);
            },
            error: () => {
              Swal.fire('Erro', 'Erro ao atualizar pessoa!', 'error');
            }
          });
        }
      });
    }
  }
}
