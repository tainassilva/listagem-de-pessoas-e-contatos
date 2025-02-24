import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-pessoas',
  templateUrl: './table-pessoas.component.html',
  styleUrls: ['./table-pessoas.component.scss']
})
export class TablePessoasComponent {

  isDelete(){
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação é irreversível. Deseja realmente excluir este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Excluído!",
          text: "O registro foi removido com sucesso.",
          icon: "success"
        });
      }
    });
  }
}
