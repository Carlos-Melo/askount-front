import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormContaComponent } from '../form-conta/form-conta.component';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(acao: string) {
    this.bsModalRef = this.modalService.show(FormContaComponent);
    this.bsModalRef.content.acao = acao;
  }

}
