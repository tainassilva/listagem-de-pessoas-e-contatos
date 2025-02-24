import { Location } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss']
})
export class AddPessoaComponent {
  constructor(private location: Location) {}

  voltar() {
    this.location.back();
  }
  isSaved(){
    Swal.fire({
      title: "Pessoa salva com sucesso",
      icon: "success",
      draggable: true
    });
  }
}
