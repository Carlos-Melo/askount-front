import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Conta } from '../../shared/conta';
import { ContaService } from '../../shared/conta.service';
import { FormContaComponent } from '../form-conta/form-conta.component';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  bsModalRef?: BsModalRef;

  contas: any;

  constructor(
    private modalService: BsModalService,
    private contaService: ContaService
    ) { }

  ngOnInit(): void {
    this.contaService.listar(1).subscribe( (data: Conta) => {
      this.contas = data;
    },
    error => {
      console.log("Erro", error);
    })
  }

  openModal(acao: string) {
    this.bsModalRef = this.modalService.show(FormContaComponent);
    this.bsModalRef.content.acao = acao;
  }

}
