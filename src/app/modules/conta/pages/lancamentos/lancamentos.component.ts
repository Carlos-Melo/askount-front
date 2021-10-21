import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormLancamentosComponent } from '../form-lancamentos/form-lancamentos.component';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit {

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(acao: string) {
    this.bsModalRef = this.modalService.show(FormLancamentosComponent, {class: 'modal-lg' });
    this.bsModalRef.content.acao = acao;
  }

}
