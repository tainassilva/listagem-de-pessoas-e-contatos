import { Component } from '@angular/core';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss']
})
export class EditPessoaComponent {

  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }
  isEdit() {
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
        Swal.fire({
          title: "Alterações salvas!",
          text: "As mudanças foram aplicadas com sucesso.",
          icon: "success",
        });
      }
    });
  }
}
